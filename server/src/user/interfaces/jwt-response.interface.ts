import { JwtPayload } from './jwt-payload.interface';

export class JwtResponse {
  status: number;
  expires_in: number;
  access_token: string;
  payload: JwtPayload;
}
