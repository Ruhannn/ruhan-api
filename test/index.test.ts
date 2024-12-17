import request from 'supertest';
import app from "../src/app";
import { config } from 'dotenv';
config()
describe('GET /api/projects', () => {
    it('get projects', (done) => {
        request(app)
            .get('/api/projects')
            .set('x-api-key', process.env.API_KEY!)
            .expect(200)
            .expect((res) => {
                expect(res.body.success).toBe(true);
                expect(res.body.message).toBe('Projects fetched successfully');
                expect(Array.isArray(res.body.data)).toBe(true);
            })
            .end(done);
    });
});

describe('GET /', () => {
    it('responds with a love message', (done) => {
        request(app)
            .get('/')
            .expect(200, '"i love ayaka 😊"', done);
    });
});