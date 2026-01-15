import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { BaseService } from "src/common/base/base.service";
import { DeviceRepository } from "../device/Device.repository";
import { CreateUserDeviceDto } from "./user-device-dto/CreateUserDeviceDto";
import { UserDevice } from "./UserDevice";
import { UserDeviceRepository } from "./UserDevice.repository";

@Injectable()
export class UserDeviceService extends BaseService<UserDevice> {
    constructor(
        protected readonly userDeviceRepository: UserDeviceRepository,
        private readonly deviceRepository: DeviceRepository, 
    ) {
        super(userDeviceRepository);
    }

    async assignDevice(dto: CreateUserDeviceDto): Promise<UserDevice> {
        await this.deviceRepository.getById(dto.deviceId);

        const isAvailable = await this.userDeviceRepository.checkAvailability(dto.deviceId, dto.ownerStartDate, dto.ownerEndDate);

        if (!isAvailable) throw new BadRequestException('Cannot insert device for overlapping');
        
        try {
            return await this.userDeviceRepository.assign(dto);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async terminateCurrentAssignment(deviceId: number): Promise<UserDevice | null> {
        const active = await this.userDeviceRepository.findActiveAssignment(deviceId);
        if (!active) throw new NotFoundException(`No assignment for ${deviceId}`);
        
        return this.userDeviceRepository.closeAssignment(active.id, new Date());
    }
}