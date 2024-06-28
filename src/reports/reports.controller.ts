import { Controller, Get, Post, Param, Delete, Body, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all reports' })
  @ApiResponse({ status: 200, description: 'Return all reports.' })
  findAll() {
    return this.reportsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get report by ID' })
  @ApiResponse({ status: 200, description: 'Return a report.' })
  @ApiResponse({ status: 404, description: 'Report not found.' })
  findOne(@Param('id') id: string) {
    return this.reportsService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new report' })
  @ApiResponse({ status: 201, description: 'The report has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiBody({ type: CreateReportDto, examples: {
    a: {
      summary: 'Example report payload',
      description: 'A standard example of a report payload',
      value: {
        title: 'Monthly User Activity',
        description: 'Summary of user activities for the month of June',
        startDate: '2024-06-01',
        endDate: '2024-06-30',
      },
    },
  }})
  create(@Body() createReportDto: CreateReportDto) {
    return this.reportsService.create(createReportDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a report' })
  @ApiResponse({ status: 200, description: 'The report has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Report not found.' })
  @ApiBody({ type: UpdateReportDto, examples: {
    a: {
      summary: 'Example report update payload',
      description: 'An example of a report update payload',
      value: {
        title: 'Updated title',
        description: 'Updated description',
      },
    },
  }})
  update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportsService.update(+id, updateReportDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a report' })
  @ApiResponse({ status: 200, description: 'The report has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Report not found.' })
  remove(@Param('id') id: string) {
    return this.reportsService.remove(+id);
  }
}
