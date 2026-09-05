$ErrorActionPreference = "Continue"

Write-Host "--- build @d-nine/contracts ---"
npm run build --workspace=@d-nine/contracts

Write-Host "--- typecheck d-nine-studio ---"
npm run typecheck --workspace=d-nine-studio

Write-Host "--- test:migration d-nine-studio ---"
npm run test:migration --workspace=d-nine-studio

Write-Host "--- build d-nine-studio ---"
npm run build --workspace=d-nine-studio

Write-Host "--- typecheck d-nine-frontend ---"
npm run typecheck --workspace=d-nine-frontend

Write-Host "--- lint:strict d-nine-frontend ---"
npm run lint:strict --workspace=d-nine-frontend

Write-Host "--- test d-nine-frontend ---"
npm run test --workspace=d-nine-frontend

Write-Host "--- test:e2e d-nine-frontend ---"
npm run test:e2e --workspace=d-nine-frontend

Write-Host "--- build static d-nine-frontend ---"
npm exec -- cross-env CONTENT_SOURCE=static npm run build --workspace=d-nine-frontend

Write-Host "--- build sanity d-nine-frontend ---"
npm exec -- cross-env CONTENT_SOURCE=sanity npm run build --workspace=d-nine-frontend

Write-Host "--- git diff --check ---"
git --no-pager diff --check

Write-Host "--- git status --short ---"
git status --short

Write-Host "--- git ls-files .env ---"
git ls-files "*.env*"
