import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, rm, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import { spawnSync } from "node:child_process";
import test from "node:test";
import * as esm from "vite-plugin-dynamic-import";

const requirePlugin = createRequire(new URL("../vendor/vite-plugin-dynamic-import/package.json", import.meta.url));
const { parse } = requirePlugin("acorn");
const commonjs = createRequire(import.meta.url)("vite-plugin-dynamic-import");

for (const [format, plugin] of [["ESM", esm], ["CommonJS", commonjs]]) {
  test(`${format} dynamic imports preserve file, extension and directory matching`, async (t) => {
    const root = await mkdtemp(path.join(tmpdir(), "whago-imports-"));
    t.after(() => rm(root, { recursive: true, force: true }));
    for (const file of ["views/home.js", "views/about.ts", "views/team/index.js", "views/team/member.ts", "views/.hidden.js", "views/ignore.txt"]) {
      const target = path.join(root, file);
      await mkdir(path.dirname(target), { recursive: true });
      await writeFile(target, "export default 1;\n");
    }
    const find = async (expression, loose = false) => {
      const node = parse(expression, { ecmaVersion: "latest", sourceType: "module" }).body[0].expression;
      const result = await plugin.globFiles({
        importeeNode: node.source,
        importExpression: expression,
        importer: path.join(root, "entry.js"),
        resolve: { tryResolve: async () => undefined },
        extensions: [".js", ".ts"],
        loose,
      });
      return result.files.sort();
    };
    assert.deepEqual(await find('import(`./views/${name}`)'), ["./views/about.ts", "./views/home.js", "./views/team/index.js"]);
    assert.deepEqual(await find('import(`./views/${name}.js`)'), ["./views/home.js"]);
    assert.deepEqual(await find('import(`./views/${name}`)', true), ["./views/about.ts", "./views/home.js", "./views/team/index.js", "./views/team/member.ts"]);
    assert.deepEqual(await find('import(`./missing/${name}.js`)'), []);
  });
}

test("deep brace patterns do not exhaust the glob worker stack", () => {
  const result = spawnSync(process.execPath, ["--input-type=module", "-e", `
    import { globSync } from 'tinyglobby';
    globSync('{'.repeat(8000) + 'x' + '}'.repeat(8000) + '/*.js', { cwd: 'tests' });
  `], { cwd: new URL("..", import.meta.url), encoding: "utf8", timeout: 5000 });
  assert.ifError(result.error);
  assert.equal(result.status, 0, result.stderr);
});

test("the installed lockfile contains no vulnerable glob chain", async () => {
  const lock = JSON.parse(await readFile(new URL("../package-lock.json", import.meta.url), "utf8"));
  for (const name of Object.keys(lock.packages)) {
    assert.doesNotMatch(name, /(?:^|\/)node_modules\/(?:fast-glob|micromatch|braces)$/);
  }
});
