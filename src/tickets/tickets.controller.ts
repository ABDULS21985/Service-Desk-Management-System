import { Controller, Get, Post, Param, Delete, Body, Put, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('tickets')
@Controller('tickets')
@UseGuards(RolesGuard)
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  @Roles('admin', 'staff')
  @ApiOperation({ summary: 'Get all tickets' })
  @ApiResponse({ status: 200, description: 'Return all tickets.' })
  findAll() {
    return this.ticketsService.findAll();
  }

  @Get('active')
  @Roles('admin', 'staff')
  @ApiOperation({ summary: 'Get all active tickets' })
  @ApiResponse({ status: 200, description: 'Return all active tickets.' })
  findAllActive() {
    return this.ticketsService.findAllActiveTickets();
  }

  @Get('my-active/:userId')
  @Roles('client', 'staff', 'admin')
  @ApiOperation({ summary: 'Get my active tickets' })
  @ApiParam({ name: 'userId', type: 'number', description: 'ID of the user' })
  @ApiResponse({ status: 200, description: 'Return all active tickets for a user.' })
  findMyActive(@Param('userId') userId: number) {
    return this.ticketsService.findMyActiveTickets(userId);
  }

  @Get('my-active-paid/:userId')
  @Roles('client', 'staff', 'admin')
  @ApiOperation({ summary: 'Get my active paid tickets' })
  @ApiParam({ name: 'userId', type: 'number', description: 'ID of the user' })
  @ApiResponse({ status: 200, description: 'Return all active paid tickets for a user.' })
  findMyActivePaid(@Param('userId') userId: number) {
    return this.ticketsService.findMyActivePaidTickets(userId);
  }

  @Get('my-closed/:userId')
  @Roles('client', 'staff', 'admin')
  @ApiOperation({ summary: 'Get my closed tickets' })
  @ApiParam({ name: 'userId', type: 'number', description: 'ID of the user' })
  @ApiResponse({ status: 200, description: 'Return all closed tickets for a user.' })
  findMyClosed(@Param('userId') userId: number) {
    return this.ticketsService.findMyClosedTickets(userId);
  }

  @Get('my-assigned/:userId')
  @Roles('staff', 'admin')
  @ApiOperation({ summary: 'Get my assigned tickets' })
  @ApiParam({ name: 'userId', type: 'number', description: 'ID of the user' })
  @ApiResponse({ status: 200, description: 'Return all assigned tickets for a user.' })
  findMyAssigned(@Param('userId') userId: number) {
    return this.ticketsService.findMyAssignedTickets(userId);
  }

  @Get('unassigned')
  @Roles('staff', 'admin')
  @ApiOperation({ summary: 'Get all unassigned tickets' })
  @ApiResponse({ status: 200, description: 'Return all unassigned tickets.' })
  findAllUnassigned() {
    return this.ticketsService.findAllUnassignedTickets();
  }

  @Get('paid')
  @Roles('admin', 'staff')
  @ApiOperation({ summary: 'Get all paid tickets' })
  @ApiResponse({ status: 200, description: 'Return all paid tickets.' })
  findAllPaid() {
    return this.ticketsService.findAllPaidTickets();
  }

  @Get('closed')
  @Roles('admin', 'staff')
  @ApiOperation({ summary: 'Get all closed tickets' })
  @ApiResponse({ status: 200, description: 'Return all closed tickets.' })
  findAllClosed() {
    return this.ticketsService.findAllClosedTickets();
  }

  @Get(':id')
  @Roles('admin', 'staff')
  @ApiOperation({ summary: 'Get a ticket by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID of the ticket' })
  @ApiResponse({ status: 200, description: 'Return a ticket by ID.' })
  findOne(@Param('id') id: number) {
    return this.ticketsService.findOne(id);
  }

  @Post()
  @Roles('admin', 'staff', 'client')
  @ApiOperation({ summary: 'Create a new ticket' })
  @ApiBody({
    type: CreateTicketDto,
    examples: {
      example1: {
        summary: 'High priority ticket',
        description: 'Create a high priority ticket',
        value: { title: 'Critical Issue', description: 'System down', priority: 'high', userId: 1, status: 'open', isPaid: false },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'The ticket has been successfully created.' })
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.createTicket(createTicketDto);
  }

  @Put(':id')
  @Roles('admin', 'staff')
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
  @Roles('admin')
  @ApiOperation({ summary: 'Delete a ticket by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID of the ticket' })
  @ApiResponse({ status: 200, description: 'The ticket has been successfully deleted.' })
  remove(@Param('id') id: number) {
    return this.ticketsService.remove(id);
  }

  @Patch(':id/status')
  @Roles('admin', 'staff')
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
  @Roles('admin', 'staff')
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
