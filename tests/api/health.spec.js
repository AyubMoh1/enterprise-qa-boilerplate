
const { test, expect } = require('@playwright/test');

test.describe('Health Endpoint', () => {
    test('should return healthy status', async ({ request }) => {
        const response = await request.get('/health');

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.status).toBe('healthy');
        expect(body.timestamp).toBeDefined();
    });
  });