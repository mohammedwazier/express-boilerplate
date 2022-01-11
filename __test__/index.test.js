const request = require('supertest');
const web = require('../build/routes/web');
const {app} = require('../build/index');

describe('Simple Crud API', () => {
    it('GET /', async () => {
        const response = await request(app).get('/');
        const body = response.body;
        expect(response.statusCode).toBe(200);
        expect(body.message).toBe('Hello World');
    })
})