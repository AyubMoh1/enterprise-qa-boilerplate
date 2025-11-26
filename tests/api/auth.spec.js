const { test, expect } = require('@playwright/test');
const { testUsers } = require('../fixtures/users');

const BASE_URL = 'http://localhost:3000';

test.describe('Authentication API', () => {
  test('should register a new user successfully', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/auth/register`, {
      data: {
        email: `user${Date.now()}@example.com`,
        password: 'Password123!'
      }
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.id).toBeDefined();
    expect(body.email).toBeDefined();
  });

  test('should fail to register with duplicate email', async ({ request }) => {
    const userData = {
      email: `duplicate${Date.now()}@example.com`,
      password: 'Password123!'
    };

    await request.post(`${BASE_URL}/api/auth/register`, { data: userData });

    const response = await request.post(`${BASE_URL}/api/auth/register`, { data: userData });

    expect(response.status()).toBe(409);
    const body = await response.json();
    expect(body.error).toBe('User already exists');
  });

  test('should fail to register without email', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/auth/register`, {
      data: {
        password: 'Password123!'
      }
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toBe('Email and password are required');
  });

  test('should login successfully with correct credentials', async ({ request }) => {
    const userData = {
      email: `login${Date.now()}@example.com`,
      password: 'Password123!'
    };
    await request.post(`${BASE_URL}/api/auth/register`, { data: userData });

    const response = await request.post(`${BASE_URL}/api/auth/login`, { data: userData });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.token).toBeDefined();
    expect(body.user.email).toBe(userData.email);
  });

  test('should fail to login with wrong password', async ({ request }) => {
    const userData = {
      email: `wrongpass${Date.now()}@example.com`,
      password: 'Password123!'
    };
    await request.post(`${BASE_URL}/api/auth/register`, { data: userData });

    const response = await request.post(`${BASE_URL}/api/auth/login`, {
      data: {
        email: userData.email,
        password: 'WrongPassword!'
      }
    });

    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body.error).toBe('Invalid credentials');
  });

  test('should fail to login with non-existent user', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/auth/login`, {
      data: {
        email: 'nonexistent@example.com',
        password: 'Password123!'
      }
    });

    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body.error).toBe('Invalid credentials');
  });
});