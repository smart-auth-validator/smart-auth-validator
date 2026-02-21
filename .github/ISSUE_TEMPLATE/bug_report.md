---
name: Bug Report
about: Report a bug
---

**Describe the bug**
Hardcoded passwords are present in the test code (`VALID_TEST_PASSWORD`, `WEAK_TEST_PASSWORD`, `MID_TEST_PASSWORD`). While they are intended for testing, their presence may trigger security scanning tools (e.g., Snyk) and could introduce potential risks if accidentally reused in production.

**Steps to reproduce**
1. Clone or download the repository containing the validation tests (`vitest` tests in `src/index.test.ts`).
2. Run a security scan using Snyk or any static analysis tool.
3. Observe warnings about hardcoded passwords.

**Expected behavior**
Test passwords should not trigger security warnings. Ideally, sensitive passwords are never hardcoded and are replaced by test vectors that cannot be misused in production.

**Environment**
- Node version: 18+ (or your current Node version)
- Library version: Vitest latest (`vitest` version used in `package.json`)
- OS: Any

**Additional context**
Developers may use hardcoded passwords for convenience during testing, but best practices recommend:
- Storing test credentials outside of code (e.g., environment variables, `.env` files).
- Using placeholder values that cannot be misused in production.
- Ensuring any hardcoded password is ignored in production builds or flagged for review.

For example, your current test has:  
```ts
const VALID_TEST_PASSWORD = "StrongPass1!@#Sha"; // Hardcoded