import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Device } from './Device';
import { BaseRepository } from 'src/common/base/base.repository';

@Injectable()
export class DeviceRepository extends BaseRepository<Device> {
    constructor(
        @InjectModel(Device)
        private readonly deviceModel: typeof Device,
    ) {
        super(deviceModel);
    }

    async getByName(name: string): Promise<Device[]> {
        return this.deviceModel.findAll({where: {name: name}})
    }

    async getByType(type: string): Promise<Device[]> {
        return this.deviceModel.findAll({where: {type: type}})
    }

    async getBySerialNumber(serialNumber: string): Promise<Device | null> {
        return this.deviceModel.findOne({where: {serialNumber: serialNumber}});
    }
}