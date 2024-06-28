import { ApiProperty } from '@nestjs/swagger';

export class CreateReportDto {
  @ApiProperty({ example: 'Monthly User Activity' })
  title: string;

  @ApiProperty({ example: 'Summary of user activities for the month of June' })
  description: string;

  @ApiProperty({ example: '2024-06-01' })
  startDate: string;

  @ApiProperty({ example: '2024-06-30' })
  endDate: string;
}
