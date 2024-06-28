import { Controller, Get, Post, Param, Delete, Body, Put, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'Get ticket by ID' })
  @ApiResponse({ status: 200, description: 'Return a ticket.' })
  @ApiResponse({ status: 404, description: 'Ticket not found.' })
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new ticket' })
  @ApiResponse({ status: 201, description: 'The ticket has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiBody({ type: CreateTicketDto, examples: {
    a: {
      summary: 'Example ticket payload',
      description: 'A standard example of a ticket payload',
      value: {
        title: 'Login Issue',
        description: 'Unable to login with correct credentials',
        status: 'open',
        priority: 'high',
        userId: 1,
      },
    },
  }})
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.createTicket(createTicketDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a ticket' })
  @ApiResponse({ status: 200, description: 'The ticket has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Ticket not found.' })
  @ApiBody({ type: UpdateTicketDto, examples: {
    a: {
      summary: 'Example ticket update payload',
      description: 'An example of a ticket update payload',
      value: {
        title: 'Resolved login issue',
        description: 'The login issue has been resolved',
        status: 'resolved',
        priority: 'medium',
      },
    },
  }})
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.updateTicket(+id, updateTicketDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a ticket' })
  @ApiResponse({ status: 200, description: 'The ticket has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Ticket not found.' })
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(+id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update ticket status' })
  @ApiResponse({ status: 200, description: 'The ticket status has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Ticket not found.' })
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.ticketsService.updateStatus(+id, status);
  }

  @Patch(':id/assign')
  @ApiOperation({ summary: 'Assign ticket' })
  @ApiResponse({ status: 200, description: 'The ticket has been successfully assigned.' })
  @ApiResponse({ status: 404, description: 'Ticket not found.' })
  assignTicket(@Param('id') id: string, @Body('assignedTo') assignedTo: number) {
    return this.ticketsService.assignTicket(+id, assignedTo);
  }
}
