import {
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  DataType,
} from 'sequelize-typescript';

export interface BaseAttributes {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export abstract class BaseModel<TModelAttributes extends BaseAttributes = any, TCreationAttributes extends Partial<TModelAttributes> = any> extends Model<TModelAttributes, TCreationAttributes> {
    
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;

    @CreatedAt
    @Column({
      type: DataType.DATE,
      field: 'created_at',
    })
    declare createdAt: Date;

    @UpdatedAt
    @Column({
      type: DataType.DATE,
      field: 'updated_at',
    })
    declare updatedAt: Date;

    @DeletedAt
    @Column({
      type: DataType.DATE,
      field: 'deleted_at',
    })
    declare deletedAt: Date;
  }


  export type BaseCreationAttributes<T extends BaseAttributes> = Omit<
    T,
    'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
  >;