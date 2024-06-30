import { Controller, Get, Post, Param, Delete, Body, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({ status: 200, description: 'Return all roles.' })
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a role by ID' })
  @ApiResponse({ status: 200, description: 'Return a role by ID.' })
  findOne(@Param('id') id: number) {
    return this.rolesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new role' })
  @ApiBody({ type: CreateRoleDto })
  @ApiResponse({ status: 201, description: 'The role has been successfully created.' })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a role by ID' })
  @ApiBody({ type: UpdateRoleDto })
  @ApiResponse({ status: 200, description: 'The role has been successfully updated.' })
  update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a role by ID' })
  @ApiResponse({ status: 200, description: 'The role has been successfully deleted.' })
  remove(@Param('id') id: number) {
    return this.rolesService.remove(id);
  }
}