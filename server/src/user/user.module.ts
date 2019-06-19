import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UserController } from './user.controller';
import { UserSchema } from './schemas/user.schema';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { JWT_SECRET } from './passport/config';
import { JwtStrategy } from './passport/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      // secretOrPrivateKey: JWT_SECRET,
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: '3 days',
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
