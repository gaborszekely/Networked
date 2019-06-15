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
  getEvents() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  getEvent(@Param('id') id: string) {
    return this.eventsService.find(id);
  }

  @Post()
  createEvent(@Body() event: CreateEventDto) {
    return this.eventsService.create(event);
  }

  @Put(':id')
  updateEvent(@Param('id') id: string, @Body() updatedBody: any) {
    return this.eventsService.update(id, updatedBody);
  }

  @Delete(':id')
  deleteEvent(@Param('id') id: string) {
    return this.eventsService.delete(id);
  }
}
