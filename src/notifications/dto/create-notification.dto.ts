import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 'Your request has been approved' })
  message: string;
}
