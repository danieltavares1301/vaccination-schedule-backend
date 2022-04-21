import mongoose from 'mongoose';

const ScheduleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    appointmentDate: { type: Date, required: true },
    appointmentTime: { type: Number, required: true },
    birthDate: { type: Date, required: true },
    isFinished: { type: Boolean, default: false },
    description: { type: String, default: '' },
  },
  {
    // automatically adds creation and modification date
    timestamps: true,
  },
);
const ScheduleModel = mongoose.model('schedule', ScheduleSchema);

export default ScheduleModel;
