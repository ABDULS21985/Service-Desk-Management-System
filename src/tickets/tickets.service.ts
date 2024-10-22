import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) {}

  findAll(): Promise<Ticket[]> {
    return this.ticketRepository.find({ relations: ['user', 'assignedTo'] });
  }

  findOne(id: number): Promise<Ticket> {
    return this.ticketRepository.findOne({ where: { id }, relations: ['user', 'assignedTo'] });
  }

  async createTicket(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const ticket = new Ticket();
    ticket.title = createTicketDto.title;
    ticket.description = createTicketDto.description;
    ticket.status = createTicketDto.status;
    ticket.priority = createTicketDto.priority;
    ticket.user = { id: createTicketDto.userId } as any;
    return this.ticketRepository.save(ticket);
  }

  async updateTicket(id: number, updateTicketDto: Partial<Ticket>): Promise<Ticket> {
    await this.ticketRepository.update(id, updateTicketDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.ticketRepository.delete(id);
  }

  async updateStatus(id: number, status: string): Promise<Ticket> {
    const ticket = await this.findOne(id);
    ticket.status = status;
    return this.ticketRepository.save(ticket);
  }

  async assignTicket(id: number, assignedToId: number): Promise<Ticket> {
    const ticket = await this.findOne(id);
    ticket.assignedTo = { id: assignedToId } as User;
    return this.ticketRepository.save(ticket);
  }

  async findAllActiveTickets(): Promise<Ticket[]> {
    return this.ticketRepository.find({ where: { status: 'open' }, relations: ['user', 'assignedTo'] });
  }

  async findMyActiveTickets(userId: number): Promise<Ticket[]> {
    return this.ticketRepository.find({ where: { user: { id: userId }, status: 'open' }, relations: ['user', 'assignedTo'] });
  }

  async findMyActivePaidTickets(userId: number): Promise<Ticket[]> {
    return this.ticketRepository.find({ where: { user: { id: userId }, status: 'open', isPaid: true }, relations: ['user', 'assignedTo'] });
  }

  async findMyClosedTickets(userId: number): Promise<Ticket[]> {
    return this.ticketRepository.find({ where: { user: { id: userId }, status: 'closed' }, relations: ['user', 'assignedTo'] });
  }

  async findMyAssignedTickets(userId: number): Promise<Ticket[]> {
    return this.ticketRepository.find({ where: { assignedTo: { id: userId } }, relations: ['user', 'assignedTo'] });
  }

  async findAllUnassignedTickets(): Promise<Ticket[]> {
    return this.ticketRepository.find({ where: { assignedTo: null }, relations: ['user'] });
  }

  async findAllPaidTickets(): Promise<Ticket[]> {
    return this.ticketRepository.find({ where: { isPaid: true }, relations: ['user', 'assignedTo'] });
  }

  async findAllClosedTickets(): Promise<Ticket[]> {
    return this.ticketRepository.find({ where: { status: 'closed' }, relations: ['user', 'assignedTo'] });
  }
}
