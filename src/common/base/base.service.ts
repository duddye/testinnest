import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'sequelize-typescript';
import { BaseRepository } from '../base/base.repository';

@Injectable()
export abstract class BaseService<T extends Model> {
    constructor(protected readonly repository: BaseRepository<T>) {}

    async getAll(): Promise<T[]> {
        return this.repository.getAll();
    }

    async getById(id: number): Promise<T> {
        const entity = await this.repository.getById(id);
        if (!entity) throw new NotFoundException(`Record with id ${id} not found`);
        return entity;
    }

    async getByField(fieldname: string, fieldvalue: string): Promise<T | T[] | null> {
        return this.repository.getByField(fieldname, fieldvalue);
    }
    async create(dto: any): Promise<T> {
        return this.repository.create(dto);
    }

    async updateById(id: number, dto: any): Promise<T> {
        const updated = await this.repository.update(id, dto);
        if (!updated) throw new NotFoundException(`Cannot Update: Record with id ${id} not found`);
        return updated;
    }

    async deleteById(id: number, force: boolean): Promise<boolean> {
        const deleted = await this.repository.delete(id, force? force : false);
        if (!deleted) throw new NotFoundException(`Cannot Delete: Record with id ${id} not found`);
        return true;
    }

    async restore(id: number): Promise<T> {
        const restored = await this.repository.restore(id);
        if (!restored) throw new NotFoundException(`Cannot Restore: Record with id ${id} not found`);
        return restored;
    }
}