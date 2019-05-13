export class CreateContactDto {
  readonly first_name: string;
  readonly last_name: string;
  readonly email?: string;
  readonly phone?: string;
  readonly job_title: string;
  readonly location: string;
  readonly company: string;
  readonly company_url?: string;
  readonly linkedin?: string;
  readonly github?: string;
  readonly facebook?: string;
  readonly notes?: any[];
}
