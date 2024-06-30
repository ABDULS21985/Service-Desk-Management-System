import { Controller, Get, Post, Param, Delete, Body, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { SlaService } from './sla.service';
import { CreateSlaDto } from './dto/create-sla.dto';
import { UpdateSlaDto } from './dto/update-sla.dto';

@ApiTags('sla')
@Controller('sla')
export class SlaController {
  constructor(private readonly slaService: SlaService) {}

  @Get()
  @ApiOperation({ summary: 'Get all SLA policies' })
  @ApiResponse({ status: 200, description: 'Return all SLA policies.' })
  findAll() {
    return this.slaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an SLA policy by ID' })
  @ApiResponse({ status: 200, description: 'Return an SLA policy by ID.' })
  findOne(@Param('id') id: number) {
    return this.slaService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new SLA policy' })
  @ApiBody({ type: CreateSlaDto })
  @ApiResponse({ status: 201, description: 'The SLA policy has been successfully created.' })
  create(@Body() createSlaDto: CreateSlaDto) {
    return this.slaService.create(createSlaDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an SLA policy by ID' })
  @ApiBody({ type: UpdateSlaDto })
  @ApiResponse({ status: 200, description: 'The SLA policy has been successfully updated.' })
  update(@Param('id') id: number, @Body() updateSlaDto: UpdateSlaDto) {
    return this.slaService.update(id, updateSlaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an SLA policy by ID' })
  @ApiResponse({ status: 200, description: 'The SLA policy has been successfully deleted.' })
  remove(@Param('id') id: number) {
    return this.slaService.remove(id);
  }
}
