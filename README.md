# Playwright E-commerce & File Upload Tests

This repository contains automated tests built with **Playwright** (TypeScript) covering:

- ✅ E-commerce authentication & order flow
- ✅ File upload functionality
- ➕ Additional edge cases like invalid login and missing file upload

---

## 🔧 Prerequisites

- Node.js v16+ installed
- Git (to clone the repo)

## 📦 Setup

```bash
# clone the repository
git clone <your-repo-url>
cd CourseDogQA

# install dependencies
npm install

# install browsers (Playwright)
npx playwright install
```

## 🚀 Running Tests

| Command | Description |
|---------|-------------|
| `npm test` | Execute all tests in headless mode |
| `npm run test:headed` | Run tests with visible browser windows |
| `npm run test:debug` | Launch Playwright Inspector for debugging |

Test files are located under `tests/` and are written in TypeScript. The fixtures directory contains test data like sample files.

## 🧱 Test Structure Overview

- `tests/auth-ecommerce.spec.ts` – tests the login, add-to-cart, checkout, and logout flow. Includes a negative login scenario.
- `tests/file-upload.spec.ts` – tests uploading a file and handling no-file-selected.

## 📝 Notes

- Playwright version used: latest stable (configured in `package.json`).
- TypeScript configuration is in `tsconfig.json`.
- Playwright config is in `playwright.config.ts`.

---

### 📌 Best Practices Followed

- Reusable helper functions (e.g., `login`)
- Page object patterns are simplistic due to size but would scale for more tests
- Assertions validate key behaviors and error messages
- Edge cases covered to improve reliability
- Tests are independent and can run in parallel


