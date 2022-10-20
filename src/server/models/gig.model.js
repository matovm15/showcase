import mongoose from 'mongoose';
import { toJson, paginate } from './plugins/index.js';

const { Schema } = mongoose;

const GigsSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      autopopulate: 'true'
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    service_provider: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          ref: 'services',
        },
      },
    ],
    duration: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'open',
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

GigsSchema.plugin(toJson);
GigsSchema.plugin(paginate);

const Gig = mongoose.model('Gig', GigsSchema);

export default Gig;
