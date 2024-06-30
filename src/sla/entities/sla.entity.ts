import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SLA {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  responseTime: number; 

  @Column()
  resolutionTime: number; 
}
