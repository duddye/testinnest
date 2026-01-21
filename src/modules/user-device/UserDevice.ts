import { Table, Column, Model, ForeignKey, DataType, AllowNull, BeforeCreate, BeforeSave, PrimaryKey} from 'sequelize-typescript';
import { User } from '../user/User';
import { Device } from '../device/Device';
import { Op } from 'sequelize';
import { Field, Int, ObjectType } from '@nestjs/graphql';


export interface UserDeviceAttributes {
  userId: number;
  deviceId: number;
  ownerStartDate: Date;
  ownerEndDate?: Date;
}

@ObjectType()
@Table({ tableName: 'user_devices', timestamps: true, underscored: true })
export class UserDevice extends Model<UserDeviceAttributes> {
    @Field(() => Int)
    @PrimaryKey
    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare userId: number;

    @Field(() => Int)
    @PrimaryKey
    @ForeignKey(() => Device)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare deviceId: number;

    @Field(() => Date)
    @AllowNull(false)
    @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
    declare ownerStartDate: Date;

    @Field(() => Date, { nullable: true })
    @AllowNull(true)
    @Column({ type: DataType.DATE })
    declare ownerEndDate: Date;


    // REVISIONARE PER CONTROLLARE SOVRAPPOSIZIONI DATE ASSEGNAZIONI
    static async findOverlap(deviceId: number, start: Date, end: Date, userId?: number) {
        return this.findOne({
            where: {
                deviceId: deviceId,
                [Op.and]: [
                    { ownerStartDate: { [Op.lt]: end } },
                    {
                        [Op.or]: [
                            { ownerEndDate: { [Op.is]: null } },
                            { ownerEndDate: { [Op.gt]: start } }
                        ],
                    }
                ]
            } as any,
        });
    }

    @BeforeCreate
    @BeforeSave
    static async checkOverlap(instance: UserDevice) {
        const overlap = await this.findOverlap(
            instance.deviceId, 
            instance.ownerStartDate, 
            instance.ownerEndDate || new Date('9999-12-31'), 
            instance.isNewRecord ? undefined : instance.userId,
        );
        
        if (overlap) throw new Error('Device already assigned!');
    }
}
