import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { CreateUserDeviceDto } from "./user-device-dto/CreateUserDeviceDto";
import { UserDeviceService } from "./UserDevice.service";
import { UserDevice } from "./UserDevice";

@Controller('user-devices')
export class UserDeviceController {
  constructor(private readonly userDeviceService: UserDeviceService) {}

  @Post('assign')
  async assign(@Body() dto: CreateUserDeviceDto): Promise<UserDevice> {
    return this.userDeviceService.assignDevice(dto);
  }

  @Patch('terminate/:deviceId')
  async terminate(@Param('deviceId', ParseIntPipe) deviceId: number): Promise<UserDevice | null> {
    return this.userDeviceService.terminateCurrentAssignment(deviceId);
  }

  @Get()
  async getAll(): Promise<UserDevice[]> {
    return this.userDeviceService.getAll();
  }
}