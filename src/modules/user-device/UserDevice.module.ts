
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserDevice } from './UserDevice';
import { UserDeviceService } from './UserDevice.service';
import { UserDeviceController } from './UserDevice.controller';
import { UserDeviceResolver } from './UserDevice.resolver';
import { UserDeviceRepository } from './UserDevice.repository';
import { DeviceModule } from '../device/Device.module';
import { UserModule } from '../user/User.module';

@Module({
  imports: [
    SequelizeModule.forFeature([UserDevice]), UserModule, DeviceModule,
  ],
  providers: [
    UserDeviceService,
    UserDeviceResolver,
    UserDeviceRepository,
  ],
  controllers: [UserDeviceController],
  exports: [UserDeviceService],
})
export class UserDeviceModule {}