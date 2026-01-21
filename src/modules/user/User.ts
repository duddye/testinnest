// definizione user
import { AllowNull, BelongsToMany, Column, DataType, Table, Unique } from 'sequelize-typescript';
import { BaseAttributes, BaseCreationAttributes, BaseModel } from 'src/common/base/base.models';
import { Device } from '../device/Device';
import { UserDevice } from '../user-device/UserDevice';
import { Field, ObjectType } from '@nestjs/graphql';

export interface UserAttributes extends BaseAttributes {
  email: string;
  password: string;
  fullname: string;
}

@ObjectType()
@Table({ tableName: 'users',  timestamps: true, paranoid: true, underscored: true })
export class User extends BaseModel<UserAttributes, BaseCreationAttributes<UserAttributes>> {
  @Field()
  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  declare email: string;

  // No field per motivi di sicurezza. Gestito solo lato server, penso
  @AllowNull(false)
  @Column(DataType.STRING)
  declare password: string;

  @Field()
  @AllowNull(false)
  @Column(DataType.STRING)
  declare fullname: string;

  @Field(() => [Device])
  @BelongsToMany(() => Device, () => UserDevice)
  declare devices: Device[];
}