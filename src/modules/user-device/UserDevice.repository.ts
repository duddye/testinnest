import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserDevice } from '../user-device/UserDevice';
import { BaseRepository } from 'src/common/base/base.repository';
import { CreateOptions, Op } from 'sequelize';
import { CreateUserDeviceDto } from './user-device-dto/CreateUserDeviceDto';

@Injectable()
export class UserDeviceRepository extends BaseRepository<UserDevice> {
    constructor(
        @InjectModel(UserDevice)
        private readonly userDeviceModel: typeof UserDevice,
    ) {
        super(userDeviceModel);
    }

    async checkAvailability(deviceId: number, start: Date, end?: Date, excludeId?: number): Promise<boolean> {
        const effectiveEnd = end || new Date('9999-12-31');
        
        const conflict = await UserDevice.findOverlap(deviceId, start, effectiveEnd, excludeId);
        
        return !conflict;
    }

    async findActiveAssignment(deviceId: number): Promise<UserDevice | null> {
        return this.userDeviceModel.findOne({
        where: {
            deviceId,
            ownerEndDate: { [Op.is]: null },
        } as any,
        });
    }

    async closeAssignment(userId: number, deviceId: number, endDate: Date): Promise<UserDevice | null> {
        const assignment = await this.userDeviceModel.findOne({ where: { userId, deviceId } });
        if (!assignment) return null;

        return assignment.update({ ownerEndDate: endDate }, {hooks: false});
    }

    async assign(dto: CreateUserDeviceDto): Promise<UserDevice | null> {
        return this.create(dto);
    }
}