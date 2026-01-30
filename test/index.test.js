const { describe, it } = require('node:test');
const assert = require('node:assert');
const app = require('../index.js');
const supertest = require('supertest');

const request = supertest(app);

describe('App routes', () => {
  it('GET / returns 200 and greeting', async () => {
    const res = await request.get('/');
    assert.strictEqual(res.status, 200);
    assert.ok(res.text.includes('Hello CI/CD Pipeline'));
  });

  it('GET /user returns 200 with default name', async () => {
    const res = await request.get('/user');
    assert.strictEqual(res.status, 200);
    assert.ok(res.text.includes('Hello'));
  });

  it('GET /user?name=Alice returns Hello Alice', async () => {
    const res = await request.get('/user').query({ name: 'Alice' });
    assert.strictEqual(res.status, 200);
    assert.ok(res.text.includes('Alice'));
  });

  it('GET /health returns 200 and ok status', async () => {
    const res = await request.get('/health');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.status, 'ok');
  });
});
