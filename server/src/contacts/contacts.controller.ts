import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Req,
  Res,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateContactDto } from './dto/create-contact-dto';
import { ContactsService } from './contacts.service';
import { Contact } from './interfaces/contact.interface';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(): Promise<Contact[]> {
    return this.contactsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<Contact> {
    return this.contactsService.findOne(id);
  }

  @Post()
  create(@Body() createContactDto: any): Promise<Contact> {
    return this.contactsService.create(createContactDto);
  }

  @Put(':id')
  update(
    @Param('id') id,
    @Body() updateContactDto: CreateContactDto,
  ): Promise<Contact> {
    return this.contactsService.update(id, updateContactDto);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<any> {
    return this.contactsService.delete(id);
  }
}
