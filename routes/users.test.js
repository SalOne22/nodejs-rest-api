/* eslint-disable no-undef */

require('dotenv').config();

const mongoose = require('mongoose');
const request = require('supertest');

const bcrypt = require('bcryptjs');

const app = require('../app');
const { usersModel } = require('../models');

const { TEST_DB_HOST } = process.env;

describe('test login route', () => {
  beforeAll(async () => {
    await mongoose.connect(TEST_DB_HOST);

    if (!(await usersModel.findOne({ email: 'test@mail.com' }))) {
      await usersModel.create({
        email: 'test@mail.com',
        password: await bcrypt.hash('password', 10),
      });
    }
  }, 60 * 1000); // таймаут для медленного интернета

  afterAll(async () => {
    await mongoose.connection.close();
  }, 60 * 1000); // таймаут для медленного интернета

  test('should login user', async () => {
    const credentials = {
      email: 'test@mail.com',
      password: 'password',
    };

    const response = await request(app)
      .post('/users/login')
      .set('Accept', 'application/json')
      .send(credentials);

    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toEqual(200);

    const { token, user } = response.body;

    expect(typeof token).toBe('string');

    expect(user).toBeDefined();

    expect(typeof user.email).toBe('string');
    expect(user.email).toBe('test@mail.com');

    expect(typeof user.subscription).toBe('string');
    expect(user.subscription).toBe('starter');
  });

  test('should not login user with invalid password', async () => {
    const credentials = {
      email: 'test@mail.com',
      password: 'invalid password',
    };

    const response = await request(app)
      .post('/users/login')
      .set('Accept', 'application/json')
      .send(credentials);

    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toEqual(401);

    const { message } = response.body;

    expect(message).toBe('Email or password is wrong');
  });

  test('should not login user with invalid email', async () => {
    const credentials = {
      email: 'invalid@mail.com',
      password: 'password',
    };

    const response = await request(app)
      .post('/users/login')
      .set('Accept', 'application/json')
      .send(credentials);

    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toEqual(401);

    const { message } = response.body;

    expect(message).toBe('Email or password is wrong');
  });

  test('should not login user with invalid body', async () => {
    const credentials = {
      password: 'password',
    };

    const response = await request(app)
      .post('/users/login')
      .set('Accept', 'application/json')
      .send(credentials);

    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toEqual(400);

    const { message } = response.body;

    expect(message).toBe('"email" is required');
  });
});
