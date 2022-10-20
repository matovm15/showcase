import mongoose, { SchemaTypes } from 'mongoose';

const { Schema } = mongoose;

const ServicesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  updated_at: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model('services', ServicesSchema);
