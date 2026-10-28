# Expense Splitter

[![CI](https://github.com/ZforZaher/expense-splitter/actions/workflows/ci.yml/badge.svg)](https://github.com/ZforZaher/expense-splitter/actions/workflows/ci.yml)

**Live site:** https://expense-splitter-one-flame.vercel.app

A small React app that splits a bill, tip included, between any number of people. The app is deliberately simple: the CI/CD pipeline around it is the real project.

![Expense Splitter screenshot](docs/screenshot.png)

## How the pipeline works

```mermaid
flowchart LR
  PR[Pull request] --> CI[Lint, test, build]
  CI -->|fail| Fix[Fix and push]
  Fix --> CI
  CI -->|pass| Preview[Preview deploy]
  Preview --> Merge[Merge to main]
  Merge --> Prod[Production deploy]
```

- **Every pull request** runs `npm ci`, lint, tests with an 80% coverage gate, and a production build in GitHub Actions.
- **Passing pull requests** get their own Vercel preview URL, posted as a comment on the pull request. Production is never touched.
- **Merging to `main`** runs the same checks again, then deploys to production. Nothing reaches the live site without passing CI.
- **The deploy jobs reuse the build artifact** from the CI job, so the site that goes live is the exact build that was tested.
- **npm dependencies are cached** between runs by `actions/setup-node`.
- **Newer pushes cancel older runs** on the same pull request. Runs on `main` are never cancelled, so a deploy is never cut off halfway.

## Quality gates

| Gate | Tool | Fails the build when |
| --- | --- | --- |
| Lint | ESLint | Any lint error |
| Tests | Vitest + React Testing Library | Any test fails |
| Coverage | `@vitest/coverage-v8` | Lines, functions, branches or statements drop below 80% |
| Build | Vite | The production build fails |
| Branch protection | GitHub ruleset | `main` can only change through a pull request with a green `ci` check |

A pull request with a failing test cannot be merged:

![Blocked pull request](docs/blocked-pr.png)

## Results

Measured from this repo's GitHub Actions runs:

| Measure | Value |
| --- | --- |
| Tests | 10 (4 unit, 6 component) |
| Coverage | 97% lines, 100% branches, 92% functions, 97% statements |
| `ci` job (install, lint, test, build) | 13-17 s |
| Preview deploy | ~30 s from green `ci` to a comment with the URL |
| Production deploy | ~26 s from green `ci` to live |
| `npm ci` | 2-3 s with or without the npm cache. The dependency tree is small, so caching saves about 1 s, within GitHub's whole-second step timing |

## Run it locally

Requires Node.js 24.

```bash
npm ci            # install exact dependency versions
npm run dev       # start the dev server
npm run coverage  # run tests with the coverage gate
```

Secrets (`VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`) live only in GitHub Actions secrets and are never committed.
