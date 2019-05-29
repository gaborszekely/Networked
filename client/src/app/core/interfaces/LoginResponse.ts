import { IJwtPayload } from "./JwtPayload";

export interface ILoginResponse {
  status: number;
  access_token: string;
  expires_in: string;
  payload: IJwtPayload;
}
