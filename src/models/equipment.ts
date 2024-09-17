import { Schema, model } from 'mongoose';

const equipmentSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, required: true },
  location: { type: String, required: true },
  acquisitionDate: { type: Date, required: true },
});

export default model('Equipment', equipmentSchema);