import { Controller, Get, Post, Body, Put, Param, Delete } from "@nestjs/common";
import { DeviceService } from "./Device.service";
import { BaseController } from "src/common/base/base.controller";
import { Device } from "./Device";
import { CreateDeviceDto } from "./device-dto.ts/CreateDeviceDto";
import { UpdateDeviceDto } from "./device-dto.ts/UpdateDeviceDto";

@Controller('devices')
export class DeviceController extends BaseController<Device, CreateDeviceDto, UpdateDeviceDto> {
    constructor(private readonly deviceService: DeviceService) {
        super(deviceService);
    }
}