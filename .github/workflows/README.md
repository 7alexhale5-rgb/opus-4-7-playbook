# CI workflow — manual add required

The intended `ci.yml` is in `ci.yml.pending`. The GITHUB_TOKEN used for the
initial push lacked `workflow` scope, so GitHub rejected the workflow file.

To enable CI:

1. Open the repo on GitHub.
2. Click `Actions` → `set up a workflow yourself` (or `new workflow`).
3. Paste the contents of `ci.yml.pending`.
4. Commit via the web UI (that path has workflow-write permission).

Or, locally:

1. `gh auth refresh -h github.com -s workflow`
2. `git mv .github/workflows/ci.yml.pending .github/workflows/ci.yml`
3. Remove this README and commit + push.
