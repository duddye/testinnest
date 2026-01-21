import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Model, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, DeletedAt, DataType } from 'sequelize-typescript';

export interface BaseAttributes {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

@ObjectType({ isAbstract: true })
export abstract class BaseModel<TModelAttributes extends BaseAttributes = any, TCreationAttributes extends Partial<TModelAttributes> = any> extends Model<TModelAttributes, TCreationAttributes> {
    @Field(() => ID)
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;

    @Field(() => Date, { nullable: true })
    @CreatedAt
    @Column({ type: DataType.DATE, field: 'created_at' })
    declare createdAt: Date;

    @Field(() => Date, { nullable: true })
    @UpdatedAt
    @Column({ type: DataType.DATE, field: 'updated_at' })
    declare updatedAt: Date;

    @Field(() => Date, { nullable: true })
    @DeletedAt
    @Column({ type: DataType.DATE, field: 'deleted_at' })
    declare deletedAt: Date;

    // Sarebbe meglio aggiungere createdBy, updatedBy, deletedBy con riferimento all'utente
  }


  export type BaseCreationAttributes<T extends BaseAttributes> = Omit<T, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;