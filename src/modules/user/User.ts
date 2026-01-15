// definizione user
import { AllowNull, BelongsToMany, Column, DataType, Table, Unique } from 'sequelize-typescript';
import { BaseAttributes, BaseCreationAttributes, BaseModel } from 'src/common/base/base.models';
import { Device } from '../device/Device';
import { UserDevice } from '../user-device/UserDevice';

export interface UserAttributes extends BaseAttributes {
  email: string;
  password: string;
  fullname: string;
}

export type UserCreationAttributes = BaseCreationAttributes<UserAttributes>;


@Table({tableName: 'users',  timestamps: true, paranoid: true})
export class User extends BaseModel<UserAttributes, UserCreationAttributes> {
  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  declare email: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare password: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  fullname: string;

  @BelongsToMany(() => Device, () => UserDevice)
  declare devices: Device[];
}