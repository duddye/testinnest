import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { CreateUserDeviceDto } from "./user-device-dto/CreateUserDeviceDto";
import { UserDeviceService } from "./UserDevice.service";
import { UserDevice } from "./UserDevice";
import { BaseController } from "src/common/base/base.controller";
import { UpdateUserDeviceDto } from "./user-device-dto/UpdateUserDeviceDto";

@Controller('user-devices')
export class UserDeviceController extends BaseController<UserDevice, CreateUserDeviceDto, UpdateUserDeviceDto > {
  constructor(private readonly userDeviceService: UserDeviceService) {
    super(userDeviceService);
  }

  @Post('assign')
  async assign(@Body() dto: CreateUserDeviceDto): Promise<UserDevice | null> {
    return this.userDeviceService.assignDevice(dto);
  }

  @Patch('terminate')
  async terminate(@Body('deviceId', ParseIntPipe) deviceId: number,  @Body('endDate') endDate?: Date): Promise<UserDevice | null> {
    return this.userDeviceService.terminateCurrentAssignment(deviceId, endDate);
  }
}