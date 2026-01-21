// src/common/base/base.controller.ts
import { Get, Post, Put, Delete, Body, Param, ParseIntPipe, Query, Patch } from '@nestjs/common';
import { BaseService } from './base.service';

export abstract class BaseController<T, CreateDto, UpdateDto> {
    constructor(private readonly baseService: BaseService<any>) {}

    @Get()
    async getAll(): Promise<T[]> {
        return this.baseService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number): Promise<T> {
        return this.baseService.getById(id);
    }


    @Get(':fieldname/:fieldvalue')
    async getByField(@Param('fieldname') fieldname: string, @Param('fieldvalue') fieldvalue: string): Promise<T | T[] | null> {
        return this.baseService.getByField(fieldname, fieldvalue);
    }

    @Post()
    async create(@Body() createDto: CreateDto): Promise<T> {
        return this.baseService.create(createDto);
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateDto): Promise<T> {
        return this.baseService.updateById(id, updateDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number, @Query('force') force?: string): Promise<boolean> {
        return this.baseService.deleteById(id, force === 'true');
    }

    @Patch(':id/restore')
    async restore(@Param('id', ParseIntPipe) id: number): Promise<T> {
        return this.baseService.restore(id);
    }
}