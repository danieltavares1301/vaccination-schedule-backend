import PatientModel from '../model/PatientModel.js';

class PatientController {
  async index(request, response) {
    // appointments sorted by day and time
    const patients = await PatientModel.find()
      .sort('appointmentDate')
      .sort('appointmentHour');

    response.status(200).send(patients);
  }

  async store(request, response) {
    const { name, birthDate, appointmentDate, appointmentHour } = request.body;

    // counts how many times the day was registered
    const countDays = await PatientModel.countDocuments({
      appointmentDate: appointmentDate,
    });

    // counts how many times the schedule has been registered
    const countSchedule = await PatientModel.where({
      appointmentDate: appointmentDate,
    }).countDocuments({ appointmentHour: appointmentHour });

    // if there are less than 20 appointments on the day
    if (countDays < 20) {
      // if there are less than 2 schedules availables, the patient will be registered
      if (countSchedule < 2) {
        const patient = await PatientModel.create({
          name,
          appointmentHour,
          appointmentDate,
          birthDate,
        });

        response
          .status(200)
          .json({ message: 'patient scheduled successfully!', patient });
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
}

export default PatientController;
