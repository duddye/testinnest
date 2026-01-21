import { AllowNull, BelongsToMany, Column, DataType, Table } from "sequelize-typescript";
import { BaseAttributes, BaseCreationAttributes, BaseModel } from "src/common/base/base.models";
import { UserDevice } from "../user-device/UserDevice";
import { User } from "../user/User";
import { Field, ObjectType } from "@nestjs/graphql";

export interface DeviceAttributes extends BaseAttributes {
  name: string;
  type: string;
  serialNumber: string;
}

@ObjectType()
@Table({ tableName: 'devices', timestamps: true, paranoid: true, underscored: true })
export class Device extends BaseModel<DeviceAttributes, BaseCreationAttributes<DeviceAttributes>> { 
  @Field()
  @Column(DataType.STRING)
  declare name: string;
  
  @Field({ nullable: true })
  @AllowNull(true)
  @Column(DataType.STRING)  /// LOV VARIABLE. 
  declare type: string;

  @Field()
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    unique: true
  })
  declare serialNumber: string;

  @Field(() => [User])
  @BelongsToMany(() => User, () => UserDevice)
  declare users: User[];
}


