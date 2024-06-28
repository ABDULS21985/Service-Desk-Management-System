import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketDto {
  @ApiProperty({ example: 'Login Issue' })
  title: string;

  @ApiProperty({ example: 'Unable to login with correct credentials' })
  description: string;

  @ApiProperty({ example: 'open' })
  status: string;

  @ApiProperty({ example: 'high' })
  priority: string;

  @ApiProperty({ example: 1 })
  userId: number;
}
