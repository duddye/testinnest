import { Table, Column, Model, ForeignKey, DataType, AllowNull, BeforeCreate, BeforeSave} from 'sequelize-typescript';
import { User } from '../user/User';
import { Device } from '../device/Device';
import { Op } from 'sequelize';


export interface UserDeviceAttributes {
  userId: number;
  deviceId: number;
  ownerStartDate: Date;
  ownerEndDate?: Date;
}

@Table({
    tableName: 'user_devices',
    timestamps: true,
    underscored: true
})
export class UserDevice extends Model<UserDeviceAttributes> {
    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare userId: number;

    @ForeignKey(() => Device)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare deviceId: number;

    @AllowNull(false)
    @Column({
        type: DataType.DATE,
        field: 'owner_start_date',
        defaultValue: DataType.NOW,
    })
    declare ownerStartDate: Date;

    @AllowNull(true)
    @Column({
        type: DataType.DATE,
        field: 'owner_end_date',
    })
    declare ownerEndDate: Date;



    static async findOverlap(deviceId: number, start: Date, end: Date, userId?: number) {
        return this.findOne({
            where: {
                deviceId: deviceId,
                userId: userId,
                [Op.and]: [
                { ownerStartDate: { [Op.lt]: end } },
                {
                    [Op.or]: [
                    { ownerEndDate: { [Op.is]: null } },
                    { ownerEndDate: { [Op.gt]: start } }
                    ]
                }
                ]
            } as any
        });
    }
    @BeforeCreate
    @BeforeSave
    static async checkOverlap(instance: UserDevice) {
        const end = instance.ownerEndDate || new Date('9999-12-31');
        const overlap = await this.findOverlap(
            instance.deviceId, 
            instance.ownerStartDate, 
            end, 
            instance.userId
        );
        
        if (overlap) throw new Error('Device already assigned!');
    }
}
