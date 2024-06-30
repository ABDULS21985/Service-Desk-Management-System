import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SLA } from './entities/sla.entity';
import { CreateSlaDto } from './dto/create-sla.dto';
import { UpdateSlaDto } from './dto/update-sla.dto';

@Injectable()
export class SlaService {
  constructor(
    @InjectRepository(SLA)
    private slaRepository: Repository<SLA>,
  ) {}

  findAll(): Promise<SLA[]> {
    return this.slaRepository.find();
  }

  findOne(id: number): Promise<SLA> {
    return this.slaRepository.findOne({ where: { id } });
  }

  create(createSlaDto: CreateSlaDto): Promise<SLA> {
    const sla = this.slaRepository.create(createSlaDto);
    return this.slaRepository.save(sla);
  }

  async update(id: number, updateSlaDto: UpdateSlaDto): Promise<SLA> {
    await this.slaRepository.update(id, updateSlaDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.slaRepository.delete(id);
  }
}
