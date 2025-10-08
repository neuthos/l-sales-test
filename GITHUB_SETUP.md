# GitHub Repository Setup Guide

Quick setup checklist untuk mengaktifkan automated workflows.

## ✅ Step-by-Step Setup

### 1. Enable GitHub Actions Permissions (WAJIB!)

**Path:** Settings → Actions → General → Workflow permissions

```
✅ Read and write permissions
✅ Allow GitHub Actions to create and approve pull requests
```

**Screenshot lokasi:**
```
Repository → Settings (tab paling kanan)
  → Actions (sidebar kiri)
    → General
      → Workflow permissions (scroll ke bawah)
```

---

### 2. Create Labels (WAJIB!)

**Option A - Automated Script:**
```bash
./scripts/create-labels.sh
```

**Option B - Manual via CLI:**
```bash
gh label create "PATCH" --color "10b981" --description "🟢 Bug fixes, patch release (0.0.X)"
gh label create "MINOR" --color "3b82f6" --description "🔵 New features, minor release (0.X.0)"
gh label create "MAJOR" --color "ef4444" --description "🔴 Breaking changes, major release (X.0.0)"
```

**Option C - Manual via UI:**
- Go to: Settings → Labels → New label
- Create 3 labels: PATCH (green), MINOR (blue), MAJOR (red)

---

### 3. Create Required Branches (Jika belum ada)

```bash
# Create staging branch
git checkout -b staging
git push -u origin staging

# Create master branch (jika pakai master, bukan main)
git checkout -b master
git push -u origin master

# Set develop as default branch (via GitHub UI)
# Settings → Branches → Default branch → develop
```

---

### 4. Setup Branch Protection (RECOMMENDED)

**Protect: `develop`**

Path: Settings → Branches → Add branch protection rule

```
Branch name pattern: develop

✅ Require a pull request before merging
   ✅ Require approvals: 1
✅ Require status checks to pass before merging
   ✅ Require branches to be up to date before merging
   Search for status checks: "ci" (akan muncul setelah CI run pertama kali)
```

**Protect: `master` (or `main`)**

Path: Settings → Branches → Add branch protection rule

```
Branch name pattern: master

✅ Require a pull request before merging
   ✅ Require approvals: 1-2 (lebih strict untuk production)
✅ Require status checks to pass before merging
   ✅ Require branches to be up to date before merging
   Search for status checks: "ci"
✅ Do not allow bypassing the above settings
```

**Note:** Status check "ci" baru muncul setelah workflow CI pernah run minimal 1x.

---

## 🧪 Test Your Setup

### Test 1: Auto PR to Staging

```bash
# 1. Commit to develop
git checkout develop
git commit --allow-empty -m "test: trigger auto PR workflow"
git push origin develop

# 2. Check GitHub
# → Go to: Actions tab
# → Should see: "Auto PR to Staging" workflow running
# → Should create: PR from develop → staging
```

### Test 2: CI Pipeline

```bash
# 1. Create feature branch
git checkout -b feat/test-ci
git commit --allow-empty -m "feat: test CI pipeline"
git push origin feat/test-ci

# 2. Create PR: feat/test-ci → develop

# 3. Check GitHub
# → Actions tab: "CI/CD Pipeline" should run
# → PR should show: lint ✅, test ✅, build ✅
# → PR comment: "✅ CI Pipeline Passed!"
```

### Test 3: Release & Version Bump

```bash
# 1. Merge staging PR (from test 1)
# → Should create: release/YYYY-MM-DD branch
# → Should create: PR from staging → release/YYYY-MM-DD

# 2. Create PR: release/YYYY-MM-DD → master

# 3. Add label to PR: "PATCH" or "MINOR" or "MAJOR"

# 4. Merge PR to master
# → Should bump version in package.json
# → Should create git tag: vX.Y.Z
# → Should create GitHub Release
```

---

## 📋 Quick Checklist

**Before workflows work:**
- [ ] GitHub Actions permissions enabled (read/write + create PRs)
- [ ] Labels created (PATCH, MINOR, MAJOR)
- [ ] Branches exist (develop, staging, master/main)

**For better security (optional):**
- [ ] Branch protection on develop (require 1 approval)
- [ ] Branch protection on master (require 1-2 approvals)
- [ ] Status check "ci" required before merge

**After first successful run:**
- [ ] Auto PR to staging works ✅
- [ ] CI pipeline runs on PRs ✅
- [ ] Version bump & release works ✅

---

## ⚠️ Troubleshooting

### Error: "Resource not accessible by integration"

**Problem:** Workflow tidak bisa create PR atau commit.

**Solution:**
```
Settings → Actions → General → Workflow permissions
→ Change to: "Read and write permissions"
→ Enable: "Allow GitHub Actions to create and approve pull requests"
```

---

### Error: "Required status check 'ci' not found"

**Problem:** Branch protection mencari status check yang belum pernah run.

**Solution:**
1. Temporary remove branch protection
2. Create & merge 1 PR dulu (CI akan run)
3. Re-enable branch protection
4. Sekarang "ci" status check sudah tersedia

---

### Labels tidak muncul saat create PR

**Problem:** Labels belum dibuat di repository.

**Solution:**
```bash
# Run script otomatis
./scripts/create-labels.sh

# Atau manual
gh label create "PATCH" --color "10b981" --description "🟢 Bug fixes"
gh label create "MINOR" --color "3b82f6" --description "🔵 New features"
gh label create "MAJOR" --color "ef4444" --description "🔴 Breaking changes"
```

---

## 📞 Need Help?

Check detailed documentation: `CLAUDE.md` → Section "GitHub Workflows & Release Process"

Common issues & solutions also documented in CLAUDE.md.
