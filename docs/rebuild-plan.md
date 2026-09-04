# WHAGO product reset — 2026-09-05

## Decision

The existing number of apps, names, interfaces, and feature lists are not requirements.
The acceptance criterion is a complete useful task, including getting the result out
of the application and using it elsewhere. The user authorized redesign, retirement,
implementation, verification, and delivery of the whole portfolio.

| Existing product | Decision | Reason and resulting scope |
| --- | --- | --- |
| Daymark | Retire independent product | A restrictive three-task routine has no demonstrated advantage worth rebuilding a planner around. Preserve original data, portable exports and the legacy app. |
| Siteboard | Retire independent product | The fixed single-page editor lacks a defensible advantage over established site builders. Preserve documents, legacy editing/export, and source. |
| FirstCall | Rebuild the core journey | A developer with a working HTTP API needs a usable local MCP tool. Intake → describe inputs → verify → export → call from a separate process must all work. |
| RepoLens | Keep as a scoped open-source CLI | Existing/new maintenance regression comparison is a concrete small task. Do not market it as code quality or security analysis. |
| gh-dep-risk | Keep as a scoped open-source CLI | Explain the dependency diff heuristic and evidence; do not claim a security verdict or distinct flagship product. |

These are product decisions based on source, current behavior and primary alternative
documentation, not fabricated customer research or adoption metrics.

## FirstCall specification

- User: developer connecting an existing HTTP API to a local MCP-compatible client.
- First result: a verified GET endpoint listed as a meaningfully described tool and
  successfully called from an independent MCP client, returning usable structured data.
- A successful API call alone is not completion. A generated source project alone is
  not completion. The default package runs with the shipped native CLI, without npm
  installation or TypeScript compilation.
- The GUI owns the complete interactive flow. CLI hints do not substitute for actions.
- Tool name, purpose and nonsecret input descriptions are editable before export.
- Secrets remain runtime environment values and never become tool arguments or output
  package contents. Export contains environment variable names and clear setup guidance.
- Native stdio supports initialization, tools/list and tools/call, validates package
  integrity, enforces bounded requests/responses and preserves useful JSON structure.
- Read-only calls are the default; mutation permission must be explicit. A caller
  cannot replace the packaged API host or authentication through tool arguments.
- Empty, verification-failed, invalid-package, missing-auth and HTTP-error states must
  explain the next action. Package creation is atomic or leaves the old output intact.

## Retirement specification

- Remove Daymark/Siteboard from the active catalog and new-user recommendations.
- Keep their historical detail URLs as clear retirement/data-recovery pages.
- Publish an origin-local retirement entry page for each subdomain; data stays in the
  same browser origin. Preserve legacy app at /legacy/ and original source in Git.
- Export exact original JSON and, for Daymark where the schema is understood, readable
  task data. Never delete or automatically rewrite localStorage, IndexedDB or SQLite.
- Update existing service workers so old navigation caches do not hide retirement.
- Preserve homepage-origin migration data recovery, including www origin.

## Execution and acceptance

1. [x] Inspect product code, real interfaces, dependencies, deployment, user changes.
2. [x] Decide product scope and retirement with explicit reasons.
3. [x] Implement native FirstCall runtime, structured tool metadata and GUI export.
4. [x] Implement retirement/recovery with legacy access; update portfolio and support.
5. [x] Test real loopback HTTP → verified export → independent MCP call, error cases,
   secret redaction and package tampering. Inspect native GUI and web results.
6. [x] Build the actual native distributable; verify clean-directory execution and
   preserve platform limits. Run web build, route/link/security/recovery tests.
7. [x] Publish exact tested sources/artifacts, update Sites and existing production
   addresses through the existing deployment path, verify production outcomes.

## Existing deployment constraint

GitHub access is available. The existing Lightsail profile `codex-lightsail` initially
reported an expired session. Authentication refresh is a deployment dependency, not
a reason to stop implementation. Do not claim whago.net/subdomain deployment until
the existing production host has been reached and release metadata verified.

## Evidence

- https://super-productivity.com/ — existing local task/focus workflow.
- https://getpublii.com/ — existing local static website creation and publishing.
- https://carrd.co/pro — established single-page site offering.
- Existing FirstCall parsing, verification, package integrity and redaction core is
  reusable; GUI export and native MCP runtime are the missing delivery path.

## Progress and final evidence

- FirstCall: full Rust suite 291 passed, strict Clippy and formatting passed. The
  actual desktop app loaded the public GitHub example, verified HTTP 200, accepted
  tool metadata and exported `get_github_repository`. The official
  `@modelcontextprotocol/client@2.0.0` client (protocol 2026-07-28) listed the tool,
  called it in a separate process and received `data.full_name=octocat/Hello-World`.
- The final audit aligned OPTIONS/non-GET permissions, redirect verification and
  export-time endpoint/header validation with the runtime instead of permitting a
  misleading verified-but-unusable package.
- Homepage: 12 tests passed, lint passed, Worker and 16-page static builds passed.
  Desktop and 390px mobile views inspected; active catalog and recovery routes
  checked. Recovery tests cover raw/corrupt/old data, scope separation, CSV escaping
  and spreadsheet formula neutralization.
- Daymark: 50 app tests, 2 retirement tests, lint/TypeScript/build passed; upstream
  dependency changes were merged and preserved. Production release
  `20260904T230815Z-be2bddbcebb6` verified at daymark.whago.net.
- Siteboard: 117 app tests, 2 retirement tests, lint/TypeScript/build passed.
  Production release `20260904T230923Z-203420090761` verified at siteboard.whago.net.
- Both production retirement entries list the browser's existing saved records;
  both /legacy/ applications opened successfully with saved state. A Daymark
  original JSON download produced a valid local JSON file. User storage and old
  caches were not deleted. Worker registration uses an external script compatible
  with the existing CSP; legacy offline routes have dedicated fallback coverage.
- Final native UI: readable theme inspected, real API request/export repeated in
  the packaged app, result scroll position corrected, and connection configuration
  copy confirmed on the visible success screen. The final app and CLI are built
  from FirstCall commit `a07b1878263b0cc724b5ba1678db0edd79c763cd`.
- FirstCall v0.3.0 published with ZIP, tar.gz and SHA256SUMS. GitHub asset digests
  match the locally verified final archives; public ZIP returns HTTP 200.
  ZIP SHA256: `97804da889a93adb39c28e646037b49d0b431309fde04a8abe3e3b860e939d59`.
- Homepage production release `whago-rebuild-20260905-1396b61` is live at
  https://whago.net, built from `1396b61fdebca7cf0bfcd94732056f6817bafd38`.
  Origin and public DNS metadata checks passed; public homepage is visually
  confirmed. FirstCall detail, archive, and www data recovery entries are verified.
- Sites version 17 deployed successfully at
  https://whago-studio-preview.rad174951.chatgpt.site with its existing owner-only
  audience preserved. Source and locally packaged artifact match the production
  homepage implementation.
- Product repositories and homepage implementation are published on their existing
  GitHub main branches without force-push; the old app source/releases are retained.

## Delivered scope and limits

- FirstCall v0.3.0 ships Apple Silicon macOS only, with ad-hoc signing and no Apple
  notarization. Other platforms are not represented as tested v0.3.0 releases.
- Exported local MCP settings use absolute application/package paths. Moving either
  requires exporting new settings. Authentication is supplied separately by the
  user's MCP client environment.
- Retired app data remains browser-local. Previously installed offline apps must
  connect once to receive their retirement service worker. Existing source,
  legacy access and backups are preserved; retirement is not a data deletion.
- RepoLens and gh-dep-risk retain their working scoped CLI implementations. Their
  catalog positioning/support boundaries changed; they were not falsely described
  as rewritten products.
- This decision is an implemented product direction with technical acceptance
  evidence, not a claim of validated customer demand or adoption.

## Dependency advisory triage

The existing dependency audit is not clean: the homepage reports 11 affected
packages and Siteboard reports 5. A read-only reachability check found no affected
runtime API in the current static public outputs or the generated owner-private
Sites Worker. Reported Next/React/RSC packages are not affected in these audit
results. Most notices concern build/deployment tools; the flagged image parser
is absent from the generated Worker. No major beta framework migration or
unverified dependency update was introduced as a last-minute automatic fix.
Retained source/CLI tooling still has maintenance advisories; this is not a
claim that every legacy dependency is vulnerability-free.
