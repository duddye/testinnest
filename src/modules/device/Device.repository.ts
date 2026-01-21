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

}