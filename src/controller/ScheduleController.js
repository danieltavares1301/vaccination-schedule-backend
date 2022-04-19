import ScheduleModel from '../model/ScheduleModel.js';

class ScheduleController {
  async index(request, response) {
    // appointments sorted by day and time
    const schedules = await ScheduleModel.find()
      .sort('appointmentDate')
      .sort('appointmentTime');

    response.status(200).send(schedules);
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
        const schedule = await ScheduleModel.create({
          name,
          appointmentTime,
          appointmentDate,
          birthDate,
        });

        response
          .status(200)
          .json({ message: 'Appointment successfully registered!', schedule });
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

    response.status(200).json({ message: 'Service finished!', schedule });
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
      .status(200)
      .json({ message: 'Schedule successfully updated!!', schedule });
  }
}

export default ScheduleController;
