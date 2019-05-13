import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ContactsModule } from './contacts/contacts.module';
import { UserModule } from './user/user.module';

// import { ContactsController } from './contacts/contacts.controller';
// import { ContactsService } from './contacts/contacts.service';
// import { AuthController } from './auth/auth.controller';
// import { AuthService } from './auth/auth.service';
// import { UserController } from './user/user.controller';
// import { UserService } from './user/user.service';

@Module({
  imports: [
    ContactsModule,
    UserModule,
    MongooseModule.forRoot('mongodb://localhost/mvp-nest'),
  ],
  controllers: [
    AppController,
    // ContactsController,
    // AuthController,
    // UserController,
  ],
  providers: [AppService /*ContactsService, AuthService, UserService*/],
})
export class AppModule {}
