// Checks the Nginx configuration that actually serves whago.net.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const config = readFileSync(new URL("../ops/nginx-whago.conf", import.meta.url), "utf8");
const servers = [...config.matchAll(/server \{([\s\S]*?)\n\}/g)].map((match) => match[1]);
const serverFor = (name) =>
  servers.find((block) => new RegExp(`server_name ${name.replace(/\./g, "\\.")};`).test(block));

test("every HTTPS site sends the security headers", () => {
  for (const name of [
    "whago.net",
    "www.whago.net",
    "daymark.whago.net",
    "repolens.whago.net",
    "siteboard.whago.net",
    "play.whago.net",
  ]) {
    const block = serverFor(name);
    assert.ok(block, `${name} has a server block`);
    for (const header of [
      "X-Content-Type-Options",
      "X-Frame-Options",
      "Content-Security-Policy",
      "Referrer-Policy",
      "Strict-Transport-Security",
    ]) {
      assert.match(block, new RegExp(`add_header ${header} `), `${name} sends ${header}`);
    }
    assert.match(block, /frame-ancestors 'none'/, name);
  }
});

test("whago.net serves the static export with one address per page", () => {
  const block = serverFor("whago.net");
  assert.match(block, /root \/srv\/whago-home\/current\/out;/);
  assert.match(block, /try_files \$uri\.html \$uri\/index\.html \$uri =404;/);
  assert.match(block, /location ~ \^\(\.\+\)\\\.html\$ \{\s*return 301 \$1\$is_args\$args;/);
  assert.match(block, /\(software\/daymark\|software\/siteboard\|archive\|releases\)\$ \{\s*return 301 \$1\/software;/);
  assert.doesNotMatch(block, /wasm-unsafe-eval/);
});

test("play.whago.net allows what the Matcha player needs and nothing broader", () => {
  const block = serverFor("play.whago.net");
  const csp = block.match(/Content-Security-Policy "([^"]+)"/)[1];
  assert.match(csp, /script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' blob:/);
  assert.doesNotMatch(csp, /'unsafe-eval'(?!.*wasm)/);
  assert.match(csp, /default-src 'self'/);
  assert.match(config, /server_name [^;]*play\.whago\.net;\s*return 301 https/);
});
