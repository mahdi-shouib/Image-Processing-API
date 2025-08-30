import app from '../index';
import supertest from 'supertest';

const request = supertest(app);

describe('Testing endpoints', () => {

    describe('Test invalid requests', () => {
        it('images endpoint with no parameters is missing filename bad request', async () => {
            const response = await request.get('/api/images');
            expect(response.badRequest).toBe(true);
            expect(response.text).toEqual('Error: missing filename parameter');
        })

        it('images endpoint with no width and height is missing width or height bad request', async () => {
            const response = await request.get('/api/images?filename=img.jpg');
            expect(response.badRequest).toBe(true);
            expect(response.text).toEqual('Error: missing width or height parameters');
        })

        it('images endpoint with only no width is missing width or height bad request', async () => {
            const response = await request.get('/api/images?filename=img.jpg&height=500');
            expect(response.badRequest).toBe(true);
            expect(response.text).toEqual('Error: missing width or height parameters');
        })

        it('images endpoint with only no height is missing width or height bad request', async () => {
            const response = await request.get('/api/images?filename=img.jpg&width=500');
            expect(response.badRequest).toBe(true);
            expect(response.text).toEqual('Error: missing width or height parameters');
        })

        it('images endpoint with text width is invalid width or height bad request', async () => {
            const response = await request.get('/api/images?filename=img.jpg&width=fivehundred&height=500');
            expect(response.badRequest).toBe(true);
            expect(response.text).toEqual('Error: invalid width or height parameters');
        })

        it('images endpoint with text height is invalid width or height bad request', async () => {
            const response = await request.get('/api/images?filename=img.jpg&width=500&height=fivehundred');
            expect(response.badRequest).toBe(true);
            expect(response.text).toEqual('Error: invalid width or height parameters');
        })

        it('images endpoint with non existant image is not found request', async () => {
            const response = await request.get('/api/images?filename=notreal.file&width=500&height=500');
            expect(response.notFound).toBe(true);
            expect(response.text).toEqual(`Error: notreal.file doesn't exist`);
        })
    })
})