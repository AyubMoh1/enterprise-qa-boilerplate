# QA Boilerplate

[![QA Tests](https://github.com/AyubMoh1/enterprise-qa-boilerplate/actions/workflows/test.yml/badge.svg)](https://github.com/AyubMoh1/enterprise-qa-boilerplate/actions/workflows/test.yml)

A simple Express API with Playwright API and UI testing for authentication and user management.

## What's Included

- Express REST API with authentication (JWT)
- SQLite database with user management
- Simple frontend (HTML/CSS/JS)
- Playwright API tests (15 tests)
- Playwright UI tests (9 tests)
- Page Object Model for UI tests
- Auth endpoints: Register & Login
- Protected CRUD endpoints for users

## Quick Start

### Option 1: Docker

```bash
docker-compose up
```

 Output:
```
[+] Running 4/4
 ✔ Network enterprise-qa-boilerplate_qa-network   Created
 ✔ Container enterprise-qa-boilerplate-app-1      Created
 ✔ Container enterprise-qa-boilerplate-tests-1    Created
 ✔ Container enterprise-qa-boilerplate-reports-1  Created

Server running on http://0.0.0.0:3000
Connected to SQLite database

Running 24 tests using 6 workers
  ✓  24 passed (7.2s)
```

```bash
# View test reports
open http://localhost:9323
```


### Option 2: Local Setup

```bash
npm install

npm start

# 3. Run tests (in another terminal)
npm test              # Run all tests
npm run test:api      # API tests only
npm run test:ui       # UI tests only
npm run test:headed   # Run with visible browser
```

## GitHub Actions (CI/CD)

This project includes automated testing via GitHub Actions. The workflow can be **manually triggered** from the GitHub UI:

1. Go to the [Actions tab](https://github.com/AyubMoh1/enterprise-qa-boilerplate/actions/workflows/test.yml)
2. Click "Run workflow"
3. Choose test type: `all`, `api`, or `ui`
4. View test results and download reports from artifacts

## Test Results

24 tests total (15 API + 9 UI)

### API Tests

```
Running 15 tests using 3 workers

  ✓   1 tests/api/health.spec.js:5:5 › Health Endpoint › should return healthy status (39ms)
  ✓   2 tests/api/auth.spec.js:7:3 › Authentication API › should register a new user successfully (95ms)
  ✓   3 tests/api/users.spec.js:28:3 › Users API › should fail to get users without token (6ms)
  ✓   4 tests/api/auth.spec.js:21:3 › Authentication API › should fail to register with duplicate email (57ms)
  ✓   5 tests/api/users.spec.js:36:3 › Users API › should get all users with valid token (6ms)
  ✓   6 tests/api/auth.spec.js:36:3 › Authentication API › should fail to register without email (4ms)
  ✓   7 tests/api/auth.spec.js:48:3 › Authentication API › should login successfully with correct credentials (108ms)
  ✓   8 tests/api/users.spec.js:49:3 › Users API › should get user by ID with valid token (6ms)
  ✓   9 tests/api/users.spec.js:63:3 › Users API › should fail to get user by ID without token (2ms)
  ✓  10 tests/api/users.spec.js:69:3 › Users API › should update user with valid token (3ms)
  ✓  11 tests/api/users.spec.js:85:3 › Users API › should fail to update user without token (3ms)
  ✓  12 tests/api/users.spec.js:95:3 › Users API › should delete user with valid token (54ms)
  ✓  13 tests/api/users.spec.js:117:3 › Users API › should fail to delete user without token (2ms)
  ✓  14 tests/api/auth.spec.js:63:3 › Authentication API › should fail to login with wrong password (100ms)
  ✓  15 tests/api/auth.spec.js:82:3 › Authentication API › should fail to login with non-existent user (3ms)

  15 passed (707ms)
```

### UI Tests

```
Running 9 tests using 3 workers

  ✓  Login page display and validation
  ✓  Login with invalid credentials
  ✓  Login with valid credentials
  ✓  Auto-redirect when logged in
  ✓  Dashboard redirect when not authenticated
  ✓  Dashboard displays user email
  ✓  Logout functionality
  ✓  Dashboard elements rendering

  9 passed
```

## API Endpoints

### Public
- `GET /` - API info
- `GET /health` - Health check
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token

### Protected (requires JWT token)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
