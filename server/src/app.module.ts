import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ContactsModule } from './contacts/contacts.module';
import { UserModule } from './user/user.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ContactsModule,
    UserModule,
    EventsModule,
    MongooseModule.forRoot('mongodb://localhost/mvp-nest'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
