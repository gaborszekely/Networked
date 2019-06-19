import { Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  tags: string[];
  created_at?: string;
  updated_at?: string;
}
