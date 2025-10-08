# Scripts Documentation

Collection of utility scripts for development and CI/CD workflows.

## 📋 Available Scripts

### CI/CD Scripts

#### `ci-local.sh` - Simulate CI Pipeline Locally

Run the same checks that GitHub Actions will run:

```bash
# Run all CI checks locally
npm run ci:local

# Or run directly
./scripts/ci-local.sh
```

**What it does:**
1. ✅ Runs linter (`npm run lint`)
2. ✅ Runs unit tests with coverage (`npm run test:ci`)
3. ✅ Builds project (`npm run build`)

**Use this before pushing** to catch issues early!

---

### Label Management Scripts

### 1. `create-labels.sh` - Create Labels

**Create all labels (required + optional):**
```bash
./scripts/create-labels.sh
```

**Create only required labels (PATCH/MINOR/MAJOR):**
```bash
./scripts/create-labels.sh --minimal
```

**Labels yang dibuat:**

**Required (WAJIB untuk workflows):**
- `PATCH` - 🟢 Bug fixes, patch release (0.0.X)
- `MINOR` - 🔵 New features, minor release (0.X.0)
- `MAJOR` - 🔴 Breaking changes, major release (X.0.0)

**Optional (bisa di-skip dengan --minimal):**
- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements or additions to documentation
- `dependencies` - Pull requests that update a dependency file
- `testing` - Related to testing
- `urgent` - Requires immediate attention
- `needs-review` - Waiting for code review

---

### 2. `delete-optional-labels.sh` - Delete Optional Labels

Hapus semua optional labels, tapi **tetap keep** PATCH/MINOR/MAJOR.

```bash
./scripts/delete-optional-labels.sh
```

**Safe to run:** Script ini hanya hapus optional labels, tidak akan hapus labels yang dibutuhkan workflows.

---

## 🔧 Manual Label Management

### List all labels:
```bash
gh label list
```

### Create single label:
```bash
gh label create "label-name" --color "10b981" --description "Description here"
```

### Delete single label:
```bash
gh label delete "label-name"

# With auto-confirm
gh label delete "label-name" --yes
```

### Delete multiple labels:
```bash
gh label delete "bug" "enhancement" "documentation" --yes
```

### Edit existing label:
```bash
gh label edit "bug" --color "ff0000" --description "New description"
```

---

## 🎯 Common Use Cases

### Setup baru - Create minimal labels only:
```bash
./scripts/create-labels.sh --minimal
```

### Setup lengkap - Create all labels:
```bash
./scripts/create-labels.sh
```

### Bersihkan optional labels:
```bash
./scripts/delete-optional-labels.sh
```

### Re-create all labels:
```bash
# Delete optional labels first
./scripts/delete-optional-labels.sh

# Then create with --minimal for clean setup
./scripts/create-labels.sh --minimal
```

---

## ⚠️ Important Notes

1. **Required labels (PATCH/MINOR/MAJOR) WAJIB ada** untuk workflows berfungsi dengan benar
2. **Optional labels** hanya untuk kemudahan kategorisasi PR
3. Script menggunakan `--force` flag, jadi **aman di-run ulang** (akan update existing labels)
4. Untuk hapus labels, lebih aman pakai script `delete-optional-labels.sh` daripada manual

---

## 📚 More Info

See `GITHUB_SETUP.md` for complete repository setup guide.
