import { Controller, Get, Post, Param, Delete, Body, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto, UpdateNotificationDto } from './dto';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all notifications' })
  @ApiResponse({ status: 200, description: 'Return all notifications.' })
  findAll() {
    return this.notificationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get notification by ID' })
  @ApiResponse({ status: 200, description: 'Return a notification.' })
  @ApiResponse({ status: 404, description: 'Notification not found.' })
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new notification' })
  @ApiResponse({ status: 201, description: 'The notification has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiBody({ type: CreateNotificationDto, examples: {
    a: {
      summary: 'Example notification payload',
      description: 'A standard example of a notification payload',
      value: {
        userId: 1,
        message: 'Your request has been approved',
      },
    },
  }})
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a notification' })
  @ApiResponse({ status: 200, description: 'The notification has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Notification not found.' })
  @ApiBody({ type: UpdateNotificationDto, examples: {
    a: {
      summary: 'Example notification update payload',
      description: 'An example of a notification update payload',
      value: {
        message: 'Your request has been processed',
      },
    },
  }})
  update(@Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationsService.updateNotification(+id, updateNotificationDto);
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark notification as read' })
  @ApiResponse({ status: 200, description: 'The notification has been marked as read.' })
  @ApiResponse({ status: 404, description: 'Notification not found.' })
  markAsRead(@Param('id') id: string) {
    return this.notificationsService.markAsRead(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a notification' })
  @ApiResponse({ status: 200, description: 'The notification has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Notification not found.' })
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(+id);
  }
}
