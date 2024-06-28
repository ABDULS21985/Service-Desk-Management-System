import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  findAll(): Promise<Notification[]> {
    return this.notificationRepository.find({ relations: ['user'] });
  }

  findOne(id: number): Promise<Notification> {
    return this.notificationRepository.findOne({ where: { id }, relations: ['user'] });
  }

  async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const notification = new Notification();
    notification.user = { id: createNotificationDto.userId } as any;
    notification.message = createNotificationDto.message;
    notification.status = 'unread';
    return this.notificationRepository.save(notification);
  }

  async markAsRead(id: number): Promise<Notification> {
    const notification = await this.findOne(id);
    notification.status = 'read';
    return this.notificationRepository.save(notification);
  }

  async remove(id: number): Promise<void> {
    await this.notificationRepository.delete(id);
  }

  async updateNotification(id: number, updateNotificationDto: Partial<Notification>): Promise<Notification> {
    await this.notificationRepository.update(id, updateNotificationDto);
    return this.findOne(id);
  }
}
