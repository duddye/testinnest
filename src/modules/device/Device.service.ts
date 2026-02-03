import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { Device } from './Device';
import { DeviceRepository } from './Device.repository';
import { CreateDeviceDto } from './device-dto.ts/CreateDeviceDto';
import { Transaction } from 'sequelize';
import { UserRepository } from '../user/User.repository';
import { UserDeviceRepository } from '../user-device/UserDevice.repository';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class DeviceService extends BaseService<Device> {
    constructor(
        protected readonly deviceRepository: DeviceRepository,
        private readonly userRepository: UserRepository,
        private readonly userDeviceRepository: UserDeviceRepository,
        private readonly sequelize: Sequelize
    ) {
        super(deviceRepository);
    }

    async create(deviceDto: CreateDeviceDto): Promise<Device> {
        const transaction: Transaction = await this.sequelize.transaction();
        try {
            //const user = await this.userRepository.getByEmail(deviceDto.userEmail);
            const user = await this.userRepository.getByField('email', deviceDto.userEmail) as any;
            if (!user) throw new NotFoundException(`User with email ${deviceDto.userEmail} not found. Device creation aborted`);
            
            //if (await this.deviceRepository.getBySerialNumber(deviceDto.serialNumber)) throw new Error('Device already exists!'); 
            if (await this.deviceRepository.getByField('serialNumber', deviceDto.serialNumber)) {
                throw new BadRequestException(`Device with serial number ${deviceDto.serialNumber} already exists!`);
            }
            const newDevice = await this.deviceRepository.create(deviceDto, { transaction });
            
            if (newDevice) {
                await this.userDeviceRepository.create({
                    userId: user.id,
                    deviceId: newDevice.id,
                    ownerStartDate: new Date(),
                }, { transaction });
            }
            await transaction.commit();

            return newDevice;
        } 
        catch (error) {
            await transaction.rollback();
            throw new BadRequestException(`Error during device creation: ${error.message}`);
        }
    }
    
    async handleDeviceAssigned(data: any): Promise<void> {
        console.log("Handling device assigned event with data:", data);
    
    }
}