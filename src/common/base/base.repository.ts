import { Model, ModelCtor } from 'sequelize-typescript';
import { Attributes, CreateOptions, CreationAttributes } from 'sequelize';

export abstract class BaseRepository<T extends Model> {
  constructor(protected readonly model: ModelCtor<T>) {}

  async getAll(): Promise<T[]> {
      return this.model.findAll();
  }
  async getById(id: number): Promise<T | null> {
    return this.model.findByPk(id);
  }
  async count(): Promise<number> {
    return this.model.count();
  }

  async create(dto: any, options?: CreateOptions): Promise<T> {
    return this.model.create(dto, options);
  }

  async update(id: number, dto: any): Promise<T | null> {
    const entity = await this.getById(id);
    if (!entity) return null;
    
    await entity.update(dto as Attributes<T>);
    return entity;
  }

  async delete(id: number, force: boolean): Promise<boolean> {
    const entity = await this.getById(id);
    if (!entity) return false;

    await entity.destroy({ force });
    return true;
  }

  async restore(id: number): Promise<T | null> {
    const entity = await this.model.findByPk(id, { paranoid: false } as any);
    if (!entity) return null;

    await entity.restore();
    return entity;
  }
}