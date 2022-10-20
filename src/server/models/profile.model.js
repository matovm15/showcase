import mongoose from 'mongoose';
import { toJson, paginate } from './plugins/index.js';

const { Schema } = mongoose;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  avatar: {
    type: String,
    required: true,
  },
  services: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: 'services',
      },
    },
  ],
  work_experience: [
    {
      job_title: {
        type: String,
      },
      company: {
        type: String,
      },
      current: {
        type: Boolean,
      },
      start_date: {
        type: String,
      },
      end_date: {
        type: String,
      },
      created_at: {
        type: Date,
        default: new Date(),
      },
    },
  ],
  education_history: [
    {
      school_name: {
        type: String,
      },
      start_year: {
        type: String,
      },
      end_year: {
        type: String,
      },
    },
  ],
  certifications: {
    type: [String],
  },
  fee: {
    type: String,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  updated_at: {
    type: Date,
    default: new Date(),
  },
}, {
  timestamps: true,
});

ProfileSchema.plugin(toJson);
ProfileSchema.plugin(paginate);

const Profile =  mongoose.model('profiles', ProfileSchema);

export default Profile;
