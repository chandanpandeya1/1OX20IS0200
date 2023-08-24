const request = require('supertest');
const app = require('./app'); 

describe('GET /numbers', () => {
    it('responds with sorted unique numbers from multiple URLs', async () => {
        const response = await request(app)
            .get('/numbers')
            .query({ url: ['http://20.244.56.144/numbers/primes', 'http://20.244.56.144/numbers/rand'] });

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body.numbers)).toBeTruthy();

        // Check if the array is sorted
        for (let i = 0; i < response.body.numbers.length - 1; i++) {
            expect(response.body.numbers[i]).toBeLessThanOrEqual(response.body.numbers[i + 1]);
        }
        console.log(response.body.numbers);
    });
});