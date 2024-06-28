import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTicketDto } from './create-ticket.dto';

export class UpdateTicketDto extends PartialType(CreateTicketDto) {
  @ApiProperty({ example: 'Resolved login issue' })
  title?: string;

  @ApiProperty({ example: 'The login issue has been resolved' })
  description?: string;

  @ApiProperty({ example: 'resolved' })
  status?: string;

  @ApiProperty({ example: 'medium' })
  priority?: string;
}
