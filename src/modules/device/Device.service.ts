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
            const user = await this.userRepository.getByEmail(deviceDto.userEmail);
            if (!user) throw new NotFoundException(`User with email ${deviceDto.userEmail} not found. Device creation aborted`);
            
            if (await this.deviceRepository.getBySerialNumber(deviceDto.serialNumber)) throw new Error('Device already exists!'); 

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
    
    async getByName(name: string): Promise<Device[]> {
        const devices = await this.deviceRepository.getByName(name);
        if (!devices || devices.length === 0) {
        throw new NotFoundException('No Device found');
        }
        return devices;
    }

    async getByType(type: string): Promise<Device[]> {
        const devices = await this.deviceRepository.getByType(type);
        if (!devices || devices.length === 0) throw new NotFoundException('No Device found');
        return devices;
    }

    async getBySerialNumber(serialNumber: string): Promise<Device> {
        const device = await this.deviceRepository.getBySerialNumber(serialNumber);
        if (!device) throw new NotFoundException('No Device found');
        return device;
    }
}