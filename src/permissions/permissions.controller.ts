import { Controller, Get, Post, Param, Delete, Body, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@ApiTags('permissions')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all permissions' })
  @ApiResponse({ status: 200, description: 'Return all permissions.' })
  findAll() {
    return this.permissionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a permission by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID of the permission' })
  @ApiResponse({ status: 200, description: 'Return a permission by ID.' })
  findOne(@Param('id') id: number) {
    return this.permissionsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new permission' })
  @ApiBody({ type: CreatePermissionDto, examples: {
    example1: {
      summary: 'Read permission',
      description: 'Create a read permission',
      value: { name: 'READ' },
    },
  }})
  @ApiResponse({ status: 201, description: 'The permission has been successfully created.' })
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a permission by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID of the permission' })
  @ApiBody({ type: UpdatePermissionDto, examples: {
    example1: {
      summary: 'Update permission name',
      description: 'Update the name of a permission',
      value: { name: 'UPDATED_READ' },
    },
  }})
  @ApiResponse({ status: 200, description: 'The permission has been successfully updated.' })
  update(@Param('id') id: number, @Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionsService.update(id, updatePermissionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a permission by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID of the permission' })
  @ApiResponse({ status: 200, description: 'The permission has been successfully deleted.' })
  remove(@Param('id') id: number) {
    return this.permissionsService.remove(id);
  }
}
