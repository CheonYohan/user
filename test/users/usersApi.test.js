const request = require('supertest');
const express = require('express');
const router = require('../../routes/users/users');
const path = require('path');
const userRepository = require('./user_test_repository');

const app = express();
app.use(express.json());
app.use('/', router);

app.set('views', path.join('J:\\\\private\\\\user\\\\', 'views'));
app.set('view engine', 'ejs');
app.use('/', router);
describe('User Router', () => {
    beforeEach(() => {
        userRepository.users.clear();
        userRepository.id = 1;
    });

    describe('GET /users/join', () => {
        it('should return a status code of 200', async () => {
            const res = await request(app).get('/join');
            expect(res.statusCode).toEqual(200);
        });
    });

    describe('POST /users/save', () => {
        it('should add a user to the repository', async () => {
            const user = {
                nickname: 'John Doe',
                password: 1111,
                email:  : 'test@test.com'
            };
            const res = await request(app).post('/save').send(user);
            expect(res.statusCode).toEqual(302);
            expect(userRepository.users.size).toEqual(1);
        });
    });

    describe('GET /users/:userId', () => {
        it('should return a user with a given id', async () => {
            const user = {
                nickname: 'John Doe',
                email: 'test@test.com',
            };
            await userRepository.save(user);
            const res = await request(app).get('/1');

            expect(res.statusCode).toEqual(200);
        });

        it('should throw an error when a user is not found', async () => {
            const res = await request(app).get('/999');
            expect(res.statusCode).toEqual(500);
            expect(res.text).toContain('User not found');
        });
    });
});
