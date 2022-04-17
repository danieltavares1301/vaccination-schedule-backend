import mongoose from 'mongoose';

const PatientSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    appointmentDate: { type: Date, required: true },
    birthDate: { type: Date, required: true },
    servicedFinished: { type: Boolean, default: false },
    description: { type: String },
  },
  {
    // automatically adds creation and modification date
    timestamps: true,
  },
);
const PatientModel = mongoose.model('patient', PatientSchema);

export default PatientModel;
