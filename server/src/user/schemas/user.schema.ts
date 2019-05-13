import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from '../interfaces/user.interface';

export const UserSchema = new mongoose.Schema(
  {
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
        validator: (v: string) => /^\S+@\S+\.\S+$/.test(v),
      },
    },
    password: {
      type: String,
      required: true,
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
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

UserSchema.pre<User>('save', async function(next: Function) {
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(this.password, salt);
    this.password = passwordHash;
    next();
  } catch (error) {
    next(error);
  }
});
