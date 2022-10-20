import mongoose from 'mongoose';
import { toJson, paginate } from './plugins/index.js';

const { Schema } = mongoose;

const ServicesSchema = new Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

ServicesSchema.plugin(toJson);
ServicesSchema.plugin(paginate);

const Service =  mongoose.model('services', ServicesSchema);

export default Service;
