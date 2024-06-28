import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'john_doe' })
  username?: string;

  @ApiProperty({ example: 'newPassword123' })
  password?: string;

  @ApiProperty({ example: 'john_doe@example.com' })
  email?: string;

  @ApiProperty({ example: 'admin' })
  role?: string;
}
