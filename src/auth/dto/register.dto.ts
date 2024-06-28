import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'john_doe' })
  username: string;

  @ApiProperty({ example: 'strongPassword123' })
  password: string;

  @ApiProperty({ example: 'john_doe@example.com' })
  email: string;

  @ApiProperty({ example: 'user' })
  role: string;
}
