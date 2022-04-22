const ScheduleModel = require('../model/ScheduleModel.js');

class ScheduleController {
  async index(request, response) {
    try {
      // appointments sorted by day and time
      const schedules = await ScheduleModel.find()
        .sort('appointmentDate')
        .sort('appointmentTime');
      response.status(200).send(schedules);
    } catch (error) {
      response.status(404).json({ message: 'Request failed!' });
    }
  }

  async store(request, response) {
    const { name, birthDate, appointmentDate, appointmentTime } = request.body;

    // counts how many times the day was registered
    const countDays = await ScheduleModel.countDocuments({
      appointmentDate: appointmentDate,
    });

    // counts how many times the schedule has been registered
    const countSchedule = await ScheduleModel.where({
      appointmentDate: appointmentDate,
    }).countDocuments({ appointmentTime: appointmentTime });

    // if there are less than 20 appointments on the day
    if (countDays < 20) {
      // if there are less than 2 schedules availables, the patient will be registered
      if (countSchedule < 2) {
        try {
          const schedule = await ScheduleModel.create({
            name,
            appointmentTime,
            appointmentDate,
            birthDate,
          });

          response.status(201).json({
            message: 'Appointment successfully registered!',
            schedule,
          });
        } catch {
          response
            .status(400)
            .json({ message: 'Error sending information in the request!' });
        }
      } else {
        return response.status(400).json({
          message: 'Appointment schedule with unavailable vacancies!',
        });
      }
    } else {
      return response
        .status(400)
        .json({ message: 'Appointment day with unavailable vacancies!' });
    }
  }

  // route to end service
  async serviceFinished(request, response) {
    const id = request.params.id;
    const { description } = request.body;

    try {
      // only the description must be updated by the nurse
      const schedule = await ScheduleModel.findByIdAndUpdate(
        id,
        {
          isFinished: true,
          description,
        },
        {
          new: true,
        },
      );

      response.status(201).json({ message: 'Service finished!', schedule });
    } catch {
      response.status(400).json({
        message: 'Error sending information in the request!',
        schedule,
      });
    }
  }

  async update(request, response) {
    const id = request.params.id;
    const {
      name,
      birthDate,
      appointmentDate,
      appointmentTime,
      isFinished,
      description,
    } = request.body;
    try {
      const schedule = await ScheduleModel.findByIdAndUpdate(
        id,
        {
          name,
          birthDate,
          appointmentDate,
          appointmentTime,
          isFinished,
          description,
        },
        {
          new: true,
        },
      );

      response
        .status(201)
        .json({ message: 'Schedule successfully updated!', schedule });
    } catch {
      response
        .status(400)
        .json({ message: 'Error sending information in the request!' });
    }
  }
}

module.exports = ScheduleController;
