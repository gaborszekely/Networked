import { Injectable } from '@nestjs/common';
import { Contact } from './interfaces/contact.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel('Contact') private readonly contactModel: Model<Contact>,
  ) {}

  async findAll(): Promise<Contact[]> {
    const contacts = await this.contactModel.find();
    return contacts;
  }

  async findOne(id: string): Promise<Contact> {
    const contact = await this.contactModel.findOne({ _id: id });
    return contact;
  }

  async create(contact: Contact): Promise<Contact> {
    const newContact = new this.contactModel(contact);
    return await newContact.save();
  }

  async delete(id: string): Promise<Contact> {
    return await this.contactModel.findByIdAndRemove(id);
  }

  async update(id: string, updatedBody: any): Promise<Contact> {
    return await this.contactModel.findByIdAndUpdate(id, updatedBody, {
      new: true,
    });
  }
}
