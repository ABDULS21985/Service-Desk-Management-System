import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SlaService } from './sla.service';
import { SlaController } from './sla.controller';
import { SLA } from './entities/sla.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SLA])],
  providers: [SlaService],
  controllers: [SlaController],
  exports: [SlaService], // Export SlaService if needed in other modules
})
export class SlaModule {}
