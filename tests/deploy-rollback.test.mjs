import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import test from "node:test";

const deployScript = await readFile(
  new URL("../ops/deploy-on-lightsail.sh", import.meta.url),
  "utf8",
);
const restoreFunction = deployScript.match(
  /restore_service_state\(\) \{\n([\s\S]*?)\n\}/,
);

assert.ok(restoreFunction, "restore_service_state must remain testable");

function runRestore({
  enabled,
  active,
  failCommand = "",
}) {
  const source = [
    `restore_service_state() {\n${restoreFunction[1]}\n}`,
    'service_name="whago-home.service"',
    `service_was_enabled="${enabled}"`,
    `service_was_active="${active}"`,
    "sudo() {",
    '  printf "%s\\n" "$*"',
    '  if [[ "$*" == "$FAIL_COMMAND" ]]; then return 23; fi',
    "  return 0",
    "}",
    "restore_service_state",
  ].join("\n");

  return spawnSync("bash", ["-c", source], {
    encoding: "utf8",
    env: { ...process.env, FAIL_COMMAND: failCommand },
  });
}

test("rollback reports an enable failure even when the later restart succeeds", () => {
  const result = runRestore({
    enabled: "true",
    active: "true",
    failCommand: "systemctl enable whago-home.service",
  });

  assert.equal(result.status, 1);
  assert.match(result.stdout, /systemctl enable whago-home\.service/);
  assert.match(result.stdout, /systemctl restart whago-home\.service/);
});

test("rollback reports a disable failure even when the later stop succeeds", () => {
  const result = runRestore({
    enabled: "false",
    active: "false",
    failCommand: "systemctl disable whago-home.service",
  });

  assert.equal(result.status, 1);
  assert.match(result.stdout, /systemctl disable whago-home\.service/);
  assert.match(result.stdout, /systemctl stop whago-home\.service/);
});

test("rollback service restoration succeeds only when every command succeeds", () => {
  const result = runRestore({
    enabled: "true",
    active: "false",
  });

  assert.equal(result.status, 0);
  assert.match(result.stdout, /systemctl enable whago-home\.service/);
  assert.match(result.stdout, /systemctl stop whago-home\.service/);
});
