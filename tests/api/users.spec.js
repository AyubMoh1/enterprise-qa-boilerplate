const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:3000';

let authToken;
let testUserId;

test.describe('Users API', () => {
  test.beforeAll(async ({ request }) => {
    const userData = {
      email: `testuser${Date.now()}@example.com`,
      password: 'Test123!'
    };

    const registerResponse = await request.post(`${BASE_URL}/api/auth/register`, {
      data: userData
    });
    const registerBody = await registerResponse.json();
    testUserId = registerBody.id;

    const loginResponse = await request.post(`${BASE_URL}/api/auth/login`, {
      data: userData
    });
    const loginBody = await loginResponse.json();
    authToken = loginBody.token;
  });

  test('should fail to get users without token', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/users`);

    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body.error).toBe('Access token required');
  });

  test('should get all users with valid token', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/users`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
  });

  test('should get user by ID with valid token', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/users/${testUserId}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.id).toBe(testUserId);
    expect(body.email).toBeDefined();
    expect(body.password).toBeUndefined();
  });

  test('should fail to get user by ID without token', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/users/${testUserId}`);

    expect(response.status()).toBe(401);
  });

  test('should update user with valid token', async ({ request }) => {
    const newEmail = `updated${Date.now()}@example.com`;
    const response = await request.put(`${BASE_URL}/api/users/${testUserId}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      },
      data: {
        email: newEmail
      }
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.email).toBe(newEmail);
  });

  test('should fail to update user without token', async ({ request }) => {
    const response = await request.put(`${BASE_URL}/api/users/${testUserId}`, {
      data: {
        email: 'newemail@example.com'
      }
    });

    expect(response.status()).toBe(401);
  });

  test('should delete user with valid token', async ({ request }) => {
    const userData = {
      email: `todelete${Date.now()}@example.com`,
      password: 'Delete123!'
    };
    const registerResponse = await request.post(`${BASE_URL}/api/auth/register`, {
      data: userData
    });
    const registerBody = await registerResponse.json();
    const userIdToDelete = registerBody.id;

    const response = await request.delete(`${BASE_URL}/api/users/${userIdToDelete}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.message).toBe('User deleted successfully');
  });

  test('should fail to delete user without token', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/api/users/${testUserId}`);

    expect(response.status()).toBe(401);
  });
});