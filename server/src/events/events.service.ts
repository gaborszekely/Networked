import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IEvent } from './interfaces/event.interface';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel('Event') private readonly eventModel: Model<IEvent>,
  ) {}

  async find(id: string): Promise<IEvent> {
    return await this.eventModel.findById(id);
  }

  async findAll(): Promise<IEvent[]> {
    return await this.eventModel.find();
  }

  async getOrderedDates(): Promise<IEvent[]> {
    return await this.eventModel
      .find()
      .sort({ date: -1 })
      .exec();
  }

  async create(event: CreateEventDto): Promise<IEvent> {
    const newEvent = new this.eventModel(event);
    return await newEvent.save();
  }

  async delete(id: string): Promise<any> {
    return await this.eventModel.findByIdAndDelete(id);
  }

  async update(id: string, updatedBody: any): Promise<IEvent> {
    return await this.eventModel.findByIdAndUpdate(id, updatedBody, {
      new: true,
    });
  }
}
