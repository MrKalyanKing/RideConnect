# GitHub Actions Setup (RideConnect)

## What was implemented
A CI workflow was added at:
- `.github/workflows/ci.yml`

Workflow name:
- `CI`

It runs automatically on:
- `push` (all branches)
- `pull_request`

## Action types/jobs included

1. `frontend` job (`Frontend Lint + Build`)
- Runs on `ubuntu-latest`
- Uses `actions/checkout@v4`
- Uses `actions/setup-node@v4` with Node.js `20`
- Uses npm cache for `Frontend/rideconnect/package-lock.json`
- Executes:
  - `npm ci`
  - `npm run lint`
  - `npm run build`

2. `backend` job (`Backend Install + Syntax Check`)
- Runs on `ubuntu-latest`
- Uses `actions/checkout@v4`
- Uses `actions/setup-node@v4` with Node.js `20`
- Uses npm cache for `Backend/package-lock.json`
- Executes:
  - `npm ci`
  - Syntax check for backend `.js` files using `node --check`

## Other CI behavior
- `permissions: contents: read`
- `concurrency` enabled to cancel older in-progress runs on same ref

## Why this setup
- Frontend has lint + build scripts, so CI validates code quality and production build.
- Backend currently has no real tests script (its `npm test` exits with failure by default), so CI uses dependency install + JS syntax validation.

## Can this be created in the GitHub web app itself?
Yes.

You can create/edit this directly in GitHub UI:
1. Open your repository on GitHub.
2. Go to `Actions` tab (or `Add file` -> `Create new file`).
3. Create file: `.github/workflows/ci.yml`.
4. Paste workflow content.
5. Commit the file to your branch.

GitHub will start running the workflow automatically after commit.

## Optional next upgrade
- Add real backend tests and replace syntax-only check with `npm test` once tests exist.
