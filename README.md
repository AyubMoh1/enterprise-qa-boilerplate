# QA Boilerplate

A simple Express API with Playwright API testing for authentication and user management.

## What's Included

- Express REST API with authentication (JWT)
- SQLite database with user management
- Playwright API tests (15 tests)
- Auth endpoints: Register & Login
- Protected CRUD endpoints for users

## Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/AyubMoh1/enterprise-qa-boilerplate.git
cd enterprise-qa-boilerplate
npm install
```

### 2. Run the API

In one terminal:

```bash
npm start
```

The API will run on `http://localhost:3000`

### 3. Run the Tests

In another terminal:

```bash
npm test
```

## Test Results

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
