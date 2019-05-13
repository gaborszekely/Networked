import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { JWT_SECRET } from './config';
import { LoginUser } from 'src/user/interfaces/login-user.interface';
import { User } from 'src/user/interfaces/user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload: LoginUser): Promise<User> {
    const user = await this.authService.validateExistingUser(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
