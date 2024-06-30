import { PartialType } from '@nestjs/mapped-types';
import { CreateSlaDto } from './create-sla.dto';

export class UpdateSlaDto extends PartialType(CreateSlaDto) {}
