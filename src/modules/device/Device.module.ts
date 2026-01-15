import { Module } from '@nestjs/common';
import { DeviceRepository } from "./Device.repository";
import { DeviceService } from "./Device.service";
import { SequelizeModule } from '@nestjs/sequelize';
import { UserDevice } from '../user-device/UserDevice';
import { Device } from './Device';
import { DeviceController } from './Device.controller';
import { User } from '../user/User';
import { UserRepository } from '../user/User.repository';
import { UserDeviceRepository } from '../user-device/UserDevice.repository';

@Module({
    imports: [SequelizeModule.forFeature([Device, User, UserDevice])],
    providers: [DeviceService, DeviceRepository, UserRepository, UserDeviceRepository],
    controllers: [DeviceController],
    exports: [DeviceService],
})
export class DeviceModule {}
