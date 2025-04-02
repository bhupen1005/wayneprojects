 NOTE: Correcting the Author of the Most Recent Commit in Git

## 1. Correcting the Author of the Most Recent Commit

If the incorrect author information is in the latest commit, you can amend it as follows:

<!-- Set the Correct Author Information -->

### ✅ Set the Correct Author Information

```bash
git config user.name "Your Correct Name"
git config user.email "your.correct.email@example.com"
```

<!-- Amend the Commit -->

### ✅ Amend the Commit

```bash
git commit --amend --reset-author --no-edit
```

> This command updates the author information without altering the commit message.

<!-- Force Push the Changes -->

### ✅ Force Push the Changes

```bash
git push --force-with-lease
```

> The `--force-with-lease` option ensures you only overwrite your own changes and not any updates made by others.

---

<!-- Notes -->

### ⚠️ Note

-   **Use caution when force pushing** to shared branches, as it rewrites commit history.
-   Always inform teammates before making such changes.
