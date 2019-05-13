import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import * as bcrypt from 'bcryptjs';
import { LoginUser } from './interfaces/login-user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  signToken(jwtPayload: JwtPayload): string {
    // In the real-world app you shouldn't expose this method publicly
    // instead, return a token once you verify user credentials
    return this.jwtService.sign(jwtPayload);
  }

  async validateExistingUser(userInfo: LoginUser): Promise<User> {
    return await this.userService.findOneByEmail(userInfo.email);
  }

  async comparePasswords(password: string, hashed: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hashed);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async login(userInfo: LoginUser): Promise<any | { status: number }> {
    try {
      const user = await this.validateExistingUser(userInfo);
      if (!user) return { status: 404 };

      if (!(await this.comparePasswords(userInfo.password, user.password))) {
        throw new UnauthorizedException();
      }

      const payload: JwtPayload = { email: user.email };
      const accessToken = this.signToken(payload);

      return {
        status: 200,
        expires_in: 3600,
        access_token: accessToken,
        email: payload.email,
      };
    } catch (err) {
      return { status: 500 };
    }
  }

  public async register(user: User): Promise<any> {
    return this.userService.create(user);
  }
}
