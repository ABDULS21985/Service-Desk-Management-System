import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Permission } from '../permissions/entities/permission.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
  ) {}

  findAll(): Promise<Role[]> {
    return this.rolesRepository.find({ relations: ['permissions'] });
  }

  findOne(id: number): Promise<Role> {
    return this.rolesRepository.findOne({ where: { id }, relations: ['permissions'] });
  }

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const { name, permissionIds } = createRoleDto;
    const permissions = await this.permissionsRepository.findByIds(permissionIds);
    const role = this.rolesRepository.create({ name, permissions });
    return this.rolesRepository.save(role);
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const { name, permissionIds } = updateRoleDto;
    const permissions = await this.permissionsRepository.findByIds(permissionIds);
    await this.rolesRepository.update(id, { name, permissions });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.rolesRepository.delete(id);
  }
}
