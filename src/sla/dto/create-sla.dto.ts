import { ApiProperty } from '@nestjs/swagger';

export class CreateSlaDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  responseTime: number;

  @ApiProperty()
  resolutionTime: number;
}
