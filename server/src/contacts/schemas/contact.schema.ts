import * as mongoose from 'mongoose';

export const ContactSchema = new mongoose.Schema(
  {
    // user_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    // },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      validate: {
        validator: v => /^\S+@\S+\.\S+$/.test(v),
      },
    },
    phone: {
      type: String,
    },
    job_title: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    company_url: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    github: {
      type: String,
    },
    facebook: {
      type: String,
    },
    labels: {
      type: [String],
    },
    notes: {
      type: [{ date: Date, note: String }],
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);
