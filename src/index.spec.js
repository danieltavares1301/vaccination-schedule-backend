const request = require('supertest');
const app = require('./Server.js');
const mongoose = require('mongoose');

afterEach(async () => {
  // Closing the DB connection allows Jest to exit successfully.
  await mongoose.connection.close();
});

describe('Test my app server', () => {
  it('Should get route', async () => {
    const response = await request(app).get('/');

    expect(response.status).toEqual(200);
  });
});
