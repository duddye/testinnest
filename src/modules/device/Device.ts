import { AllowNull, BelongsToMany, Column, DataType, Table } from "sequelize-typescript";
import { BaseAttributes, BaseCreationAttributes, BaseModel } from "src/common/base/base.models";
import { UserDevice } from "../user-device/UserDevice";
import { User } from "../user/User";

export interface DeviceAttributes extends BaseAttributes {
  name: string;
  type: string;
  serialNumber: string;
}

export type DeviceCreationAttributes = BaseCreationAttributes<DeviceAttributes>;

@Table({
  tableName: 'devices',
  timestamps: true,
  paranoid: true
})
export class Device extends BaseModel<DeviceAttributes, DeviceCreationAttributes> { 
  @Column(DataType.STRING)
  declare name: string;
  
  @AllowNull(true)
  @Column(DataType.STRING)  /// LOV VARIABLE. 
  declare type: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    field: 'serial_number',
    unique: true,
  })
  declare serialNumber: string;

  @BelongsToMany(() => User, () => UserDevice)
  declare users: User[];
}


