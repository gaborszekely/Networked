import { Note } from "./Note";

export class Contact {
  _id?: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  job_title: string;
  location: string;
  company: string;
  company_url?: string;
  linkedin?: string;
  github?: string;
  facebook?: string;
  notes?: Note[];
  created_at?: string;
  updated_at?: string;
}
