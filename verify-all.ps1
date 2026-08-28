npm run typecheck --workspace=d-nine-studio
$LASTEXITCODE1 = $LASTEXITCODE

npm run build --workspace=d-nine-studio
$LASTEXITCODE2 = $LASTEXITCODE

npm exec --workspace=d-nine-studio -- sanity schema extract --enforce-required-fields
$LASTEXITCODE3 = $LASTEXITCODE

# The manifest command doesn't exist out of box for standard v3 sanity, maybe it's custom. Let's wrap it in try/catch or just ignore failure if not present.
npm exec --workspace=d-nine-studio -- sanity manifest extract
$LASTEXITCODE4 = $LASTEXITCODE

npm run content:complete:dry --workspace=d-nine-studio
$LASTEXITCODE5 = $LASTEXITCODE

npm run content:validate --workspace=d-nine-studio
$LASTEXITCODE6 = $LASTEXITCODE

npm run assets:check --workspace=d-nine-frontend
$LASTEXITCODE7 = $LASTEXITCODE

npm run typecheck --workspace=d-nine-frontend
$LASTEXITCODE8 = $LASTEXITCODE

npm run lint:strict --workspace=d-nine-frontend
$LASTEXITCODE9 = $LASTEXITCODE

npm run test --workspace=d-nine-frontend
$LASTEXITCODE10 = $LASTEXITCODE

npm exec --workspace=d-nine-frontend -- cross-env CONTENT_SOURCE=static next build
$LASTEXITCODE11 = $LASTEXITCODE

npm exec --workspace=d-nine-frontend -- cross-env CONTENT_SOURCE=sanity next build
$LASTEXITCODE12 = $LASTEXITCODE

git --no-pager diff --check
$LASTEXITCODE13 = $LASTEXITCODE

git status --short
$LASTEXITCODE14 = $LASTEXITCODE

git ls-files "*.env*"
$LASTEXITCODE15 = $LASTEXITCODE

Write-Output ""
Write-Output "=== EXIT CODES ==="
Write-Output "typecheck (studio): $LASTEXITCODE1"
Write-Output "build (studio): $LASTEXITCODE2"
Write-Output "schema extract: $LASTEXITCODE3"
Write-Output "manifest extract: $LASTEXITCODE4"
Write-Output "content:complete:dry: $LASTEXITCODE5"
Write-Output "content:validate: $LASTEXITCODE6"
Write-Output "assets:check: $LASTEXITCODE7"
Write-Output "typecheck (frontend): $LASTEXITCODE8"
Write-Output "lint:strict: $LASTEXITCODE9"
Write-Output "test: $LASTEXITCODE10"
Write-Output "build static: $LASTEXITCODE11"
Write-Output "build sanity: $LASTEXITCODE12"
Write-Output "git diff --check: $LASTEXITCODE13"
Write-Output "git status: $LASTEXITCODE14"
Write-Output "git env: $LASTEXITCODE15"
