const request = require('supertest');
const app = require('../Server.js');
const ScheduleModel = require('../model/ScheduleModel');
const mongoose = require('mongoose');

const schedulesTest = {
  name: 'Patient test',
  appointmentDate: '2022-04-11T17:07:43.258Z',
  appointmentTime: 4,
  birthDate: '2001-04-22T17:07:43.258Z',
};

// id igual ao gerado pelo mongoose, porém este é inventado para testes
const idTest = '6261a104b2cd5b73a5732d2c';

afterEach(() => mongoose.connection.close);

describe('POST /schedule', () => {
  it('should return 201 and check schedule with name "Patient test" exist', async () => {
    return await request(app)
      .post('/schedule')
      .send(schedulesTest)
      .expect(201)
      .then(() => {
        return request(app).get('/schedule').query(schedulesTest).expect(200);
      });
  });

  it('should return 400 because there are already 2 appointments for the time', async () => {
    // segundo agendamento
    await request(app).post('/schedule').send(schedulesTest);

    // terceiro agendamento
    return await request(app)
      .post('/Schedule')
      .send(schedulesTest)
      .expect(400)
      .then(response => {
        expect(response.body.message).toEqual(
          'Appointment time with unavailable vacancies!',
        );
      });
  });
});

describe('GET /Schedule', () => {
  it('Should return 200', () => {
    return request(app).get('/schedule').expect(200);
  });
});

describe('GET /schedule/{id}', () => {
  it("should return 200 and check schedule name is 'Patient test'", async () => {
    const schedule = await ScheduleModel.findOne({ name: 'Patient test' });

    return await request(app)
      .get(`/schedule/${schedule._id}`)
      .expect(200)
      .then(response => {
        expect(response.body.name).toEqual('Patient test');
      });
  });

  it("should return 404 with 'User not found'", async () => {
    return await request(app)
      .get(`/schedule/${idTest}`)
      .expect(404)
      .then(response => {
        expect(response.body.message).toEqual('User not found');
      });
  });
});

describe('PUT /schedule/serviceFinished/{id}', () => {
  it('should return 201 and verify that the patient has been vaccinated', async () => {
    const schedule = await ScheduleModel.findOne({ name: 'Patient test' });

    return await request(app)
      .put(`/schedule/serviceFinished/${schedule._id}`)
      .send({
        description: 'patient attended',
      })
      .expect(201)
      .then(async () => {
        const response = await request(app).get(`/schedule/${schedule._id}`);
        expect(response.body.isFinished).toEqual(true);
      });
  });

  it('should return the error message "User not found"', async () => {
    const response = await request(app)
      .put(`/schedule/serviceFinished/${idTest}`)
      .send({
        description: 'patient attended',
      });
    expect(response.body.message).toEqual('User not found');
  });
});
