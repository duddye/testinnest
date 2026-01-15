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

    async closeAssignment(id: number, endDate: Date): Promise<UserDevice | null> {
        return this.update(id, { ownerEndDate: endDate });
    }

    async assign(dto: CreateUserDeviceDto, options?: CreateOptions): Promise<UserDevice> {
        return this.create(dto, options);
    }
}