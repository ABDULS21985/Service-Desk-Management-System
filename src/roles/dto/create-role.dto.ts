import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ type: [Number] })
  permissionIds: number[];
}
