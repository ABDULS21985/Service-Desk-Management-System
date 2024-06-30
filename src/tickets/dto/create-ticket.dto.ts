import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  priority: string; // 'low', 'medium', 'high'

  @ApiProperty()
  status: string; // 'open', 'in-progress', 'closed'

  @ApiProperty()
  isPaid: boolean;

  @ApiProperty()
  userId: number;
}
