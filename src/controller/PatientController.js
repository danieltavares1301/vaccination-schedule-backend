import PatientModel from '../model/PatientModel.js';
import dotenv from 'dotenv';

dotenv.config();

// toda a lógica que busca as informações no Model e devolve uma resposta ao usuário
class PatientController {
  //retorna todos
  async index(request, response) {
    // const { name, appointmentDate, appointmentHour, birthDate } = request.body;
    // const limitDay = 20;
    // const limitHour = 2;
    // const qtdDay = await PatientModel.countDocuments({ day: appointmentDate });
    // const qtdHour = await PatientModel.countDocuments({
    //   hour: appointmentDate,
    // });

    // response.send(qtdDay, qtdHour);

    const patients = await PatientModel.find();
    response.send(patients);
  }

  //POST
  async store(request, response) {
    const { name, appointmentDate, appointmentHour, birthDate } = request.body;
    const limitDay = 20;
    const limitHour = 2;
    const qtdDay = await PatientModel.countDocuments({ day: appointmentDate });
    const qtdHour = await PatientModel.countDocuments({
      hour: appointmentDate,
    });

    const patient = await PatientModel.create({
      name,
      appointmentHour,
      appointmentDate,
      birthDate,
    });

    response.send({ message: 'patient created', patient });
  }
}

export default PatientController;
