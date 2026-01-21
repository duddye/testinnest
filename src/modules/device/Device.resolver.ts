import { BaseResolver } from "src/common/base/base.resolver";
import { Device } from "./Device";
import { CreateDeviceDto } from "./device-dto.ts/CreateDeviceDto";
import { UpdateDeviceDto } from "./device-dto.ts/UpdateDeviceDto";
import { Resolver, Query, Args } from '@nestjs/graphql';
import { DeviceService } from "./Device.service";
@Resolver(() => Device)
export class DeviceResolver extends BaseResolver<Device, CreateDeviceDto, UpdateDeviceDto>(Device, CreateDeviceDto, UpdateDeviceDto) {
    constructor(protected readonly deviceService: DeviceService) {
        super(deviceService);
    }
}