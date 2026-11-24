# QuickRent – GitHub Actions CI/CD Demo

A simple one-page car rental site built with React (Vite), shipped by a GitHub Actions **Test → Build → Deploy** pipeline.
Every push to `main` is automatically tested, built and published to GitHub Pages.

**Live site:** https://oguzhanfatihkucuk.github.io/github-actions-example/

## Run locally
```bash
npm install
npm run dev     # development server
npm test        # run tests
npm run build   # production build (dist/)
```

## Pipeline
File: `.github/workflows/ci-cd.yml`

| Stage | What it does | When |
|---|---|---|
| 🧪 Test | `npm ci` + `npm test` | Every push and PR |
| 📦 Build | `npm run build`, stores the output as an artifact | If tests pass |
| 🚀 Deploy | Publishes to GitHub Pages | Only on push to `main` |

## Demo scenarios
1. **Happy path:** Change the hero heading in `src/App.jsx` (and update the matching text in `src/App.test.jsx`) → push → watch all 3 jobs turn green → the site shows the new heading and the new commit hash in the footer.
2. **Failing pipeline:** Change only the heading in `App.jsx`, leave the test as is → push → the Test job fails, Build and Deploy **never run**. The live site stays intact.
3. **Pull request:** Make a change on a new branch and open a PR → Test and Build run, Deploy is skipped; check results appear on the PR page.
