# Temporary glob dependency replacement

This is the MIT-licensed npm distribution of `vite-plugin-dynamic-import@1.6.0`.
The original tarball is https://registry.npmjs.org/vite-plugin-dynamic-import/-/vite-plugin-dynamic-import-1.6.0.tgz
and its SHA-256 is `9d3f067172d7a46630479b9f5a16bcda02e8a02a5be9fe44d623e6b2dfea4ca0`.
The original license, public exports, and type declarations are preserved.

`vinext@0.0.50` uses this plugin through `vite-plugin-commonjs`. Its old
`fast-glob` dependency brings in `micromatch` and `braces`. All published
`braces` versions are affected by [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm)
as of 2026-10-12. Downgrading Vinext to satisfy npm's suggested fix would
discard the application's current build runtime.

The only runtime edits, in both the CommonJS and ESM distributions, are:

- Import `globSync` from `tinyglobby` instead of `fast-glob`.
- Replace the sole `fastGlob.sync(patterns, { cwd })` call with
  `globSync(patterns, { cwd })`.

The manifest replaces `fast-glob` with exact `tinyglobby@0.2.17`, marks this
local package private, and identifies it as `1.6.0-whago.1`. This is the same
glob implementation already used by Vite; it depends on `fdir` and `picomatch`,
not `braces`. The root override applies this package to the CommonJS plugin.
No vulnerable package is hidden from `npm audit` or exempted from CI.

`tests/dynamic-import-glob.test.mjs` checks both module formats, extension and
directory matching, nested imports, hidden-file exclusion, unresolved paths,
and deeply nested brace patterns. Existing Worker rendering and static-export
tests remain required. Remove this override and directory when the upstream
plugin publishes a release without the vulnerable dependency chain.
