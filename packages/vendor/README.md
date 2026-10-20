# Vendored security patches

These packages are narrowly vendored to keep the dependency graph secure while
upstream packages still pin vulnerable or incompatible dependency versions.
They retain their upstream package names and licenses so npm can satisfy the
original dependency contracts without `--force` or invalid dependency trees.

## `@vercel/frameworks` 3.29.0

- Source: the published `@vercel/frameworks@3.29.0` package (Apache-2.0).
- Changes: `js-yaml` is updated from 3.13.1 to 4.3.2, `smol-toml` from 1.5.2
  to 1.9.1, and the removed `safeLoad()` call is migrated to `load()`.
- Reason: Sanity CLI currently pins the vulnerable dependency versions.

## `typeid-js` 1.2.0

- Source: the published `typeid-js@1.2.0` package (Apache-2.0).
- Change: the compatible `uuid` dependency is updated from `^10.0.0` to
  `^11.1.1`.
- Reason: `uuid` versions below 11.1.1 are covered by
  `GHSA-w5hq-g745-h8pq`.

## `braces` 3.0.4

- Source: the published `braces@3.0.3` package (MIT).
- Change: parsing rejects brace nesting beyond a bounded `maxDepth` (100 by
  default) before recursive AST walkers run.
- Reason: `GHSA-vfj7-8cjw-p6xm` affects all published versions through 3.0.3
  and no fixed npm release exists.

Run `npm run test:vendor-security` after dependency changes. Remove each local
package as soon as its upstream parent accepts a secure official release.
