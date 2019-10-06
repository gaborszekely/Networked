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
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}
  @Get()
  async getEvents() {
    return await this.eventsService.getOrderedDates();
  }

  @Get(':id')
  async getEvent(@Param('id') id: string) {
    return await this.eventsService.find(id);
  }

  @Post()
  async createEvent(@Body() event: CreateEventDto) {
    return await this.eventsService.create(event);
  }

  @Put(':id')
  async updateEvent(@Param('id') id: string, @Body() updatedBody: any) {
    return await this.eventsService.update(id, updatedBody);
  }

  @Delete(':id')
  async deleteEvent(@Param('id') id: string) {
    return await this.eventsService.delete(id);
  }
}
