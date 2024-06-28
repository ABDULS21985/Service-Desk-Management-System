import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateReportDto } from './create-report.dto';

export class UpdateReportDto extends PartialType(CreateReportDto) {
  @ApiProperty({ example: 'Updated title' })
  title?: string;

  @ApiProperty({ example: 'Updated description' })
  description?: string;
}
