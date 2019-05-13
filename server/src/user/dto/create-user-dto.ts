export class CreateUserDto {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone?: string;
  job_title: string;
  location: string;
  company: string;
  company_url?: string;
  linkedin?: string;
  github?: string;
  facebook?: string;
}
