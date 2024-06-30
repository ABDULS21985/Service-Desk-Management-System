import { Controller, Get, Post, Param, Delete, Body, Put, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@ApiTags('tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tickets' })
  @ApiResponse({ status: 200, description: 'Return all tickets.' })
  findAll() {
    return this.ticketsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a ticket by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID of the ticket' })
  @ApiResponse({ status: 200, description: 'Return a ticket by ID.' })
  findOne(@Param('id') id: number) {
    return this.ticketsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new ticket' })
  @ApiBody({
    type: CreateTicketDto,
    examples: {
      example1: {
        summary: 'High priority ticket',
        description: 'Create a high priority ticket',
        value: { title: 'Critical Issue', description: 'System down', priority: 'high', userId: 1, status: 'open' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'The ticket has been successfully created.' })
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.createTicket(createTicketDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a ticket by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID of the ticket' })
  @ApiBody({
    type: UpdateTicketDto,
    examples: {
      example1: {
        summary: 'Update ticket priority',
        description: 'Update the priority of a ticket',
        value: { title: 'Critical Issue', description: 'System down', priority: 'medium', status: 'in-progress' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'The ticket has been successfully updated.' })
  update(@Param('id') id: number, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.updateTicket(id, updateTicketDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a ticket by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID of the ticket' })
  @ApiResponse({ status: 200, description: 'The ticket has been successfully deleted.' })
  remove(@Param('id') id: number) {
    return this.ticketsService.remove(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update the status of a ticket' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID of the ticket' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'closed' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'The status of the ticket has been successfully updated.' })
  updateStatus(@Param('id') id: number, @Body() body: { status: string }) {
    return this.ticketsService.updateStatus(id, body.status);
  }

  @Patch(':id/assign')
  @ApiOperation({ summary: 'Assign a ticket to a user' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID of the ticket' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        assignedToId: { type: 'number', example: 2 },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'The ticket has been successfully assigned.' })
  assign(@Param('id') id: number, @Body() body: { assignedToId: number }) {
    return this.ticketsService.assignTicket(id, body.assignedToId);
  }
}
