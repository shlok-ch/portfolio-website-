const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const http = require('http');
const app = require('../app');

let server;
let baseUrl;

describe('Portfolio REST API Automated Tests', () => {
  test.before((_, done) => {
    // Start test server on ephemeral port
    server = http.createServer(app);
    server.listen(0, () => {
      const port = server.address().port;
      baseUrl = `http://127.0.0.1:${port}`;
      done();
    });
  });

  test.after((_, done) => {
    server.close(done);
  });

  test('GET /api/health should return 200 and status ok', async () => {
    const res = await fetch(`${baseUrl}/api/health`);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.status, 'ok');
    assert.ok(data.uptime >= 0);
    assert.ok(data.database);
  });

  test('GET /api/resume/pdf should serve PDF with correct headers', async () => {
    const res = await fetch(`${baseUrl}/api/resume/pdf`);
    assert.equal(res.status, 200);
    assert.equal(res.headers.get('content-type'), 'application/pdf');
    assert.ok(res.headers.get('content-disposition').includes('Shlok_Chaturvedi_Resume.pdf'));
    const buffer = await res.arrayBuffer();
    assert.ok(buffer.byteLength > 1000);
  });

  test('GET /api/resume/docx should serve DOCX with correct headers', async () => {
    const res = await fetch(`${baseUrl}/api/resume/docx`);
    assert.equal(res.status, 200);
    assert.ok(res.headers.get('content-type').includes('wordprocessingml'));
    assert.ok(res.headers.get('content-disposition').includes('Shlok_Chaturvedi_Resume.docx'));
    const buffer = await res.arrayBuffer();
    assert.ok(buffer.byteLength > 1000);
  });

  test('POST /api/contact should fail on empty body with 400', async () => {
    const res = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    assert.equal(res.status, 400);
    const data = await res.json();
    assert.equal(data.success, false);
    assert.ok(Array.isArray(data.errors));
    assert.ok(data.errors.length >= 3);
  });

  test('POST /api/contact should fail on invalid email with 400', async () => {
    const res = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Visitor',
        email: 'invalid-email-address',
        message: 'This is a valid test message with more than ten characters.',
      }),
    });
    assert.equal(res.status, 400);
    const data = await res.json();
    assert.equal(data.success, false);
    const emailError = data.errors.find((e) => e.field === 'email');
    assert.ok(emailError);
  });

  test('POST /api/contact should fail on short message with 400', async () => {
    const res = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Visitor',
        email: 'visitor@example.com',
        message: 'Hi',
      }),
    });
    assert.equal(res.status, 400);
    const data = await res.json();
    assert.equal(data.success, false);
    const msgError = data.errors.find((e) => e.field === 'message');
    assert.ok(msgError);
  });

  test('GET /unknown-route should return 404 with structured JSON', async () => {
    const res = await fetch(`${baseUrl}/api/non-existent-route`);
    assert.equal(res.status, 404);
    const data = await res.json();
    assert.equal(data.success, false);
    assert.ok(data.message.includes('Resource not found'));
  });
});
