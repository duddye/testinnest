import { CreateUserDeviceDto } from "./user-device-dto/CreateUserDeviceDto";
import { UserDevice } from "./UserDevice";
import { UserDeviceService } from "./UserDevice.service";
import { BaseResolver } from "src/common/base/base.resolver";
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

@Resolver(() => UserDevice)
export class UserDeviceResolver extends BaseResolver<UserDevice, CreateUserDeviceDto, CreateUserDeviceDto>(UserDevice, CreateUserDeviceDto, CreateUserDeviceDto) {
    constructor(protected readonly userDeviceService: UserDeviceService) {
        super(userDeviceService);
    }
/*
    @Query(() => [UserDevice], { name: 'getAllUserDevices' })
    async getAllUserDevices(): Promise<UserDevice[]> {
        return this.userDeviceService.getAll();
    }
*/
    @Mutation(() => UserDevice, { name: 'assignUserDevice' })
    async assignUserDevice(
        @Args('input', { type: () => CreateUserDeviceDto }) dto: CreateUserDeviceDto
    ): Promise<UserDevice | null> {
        return this.userDeviceService.assignDevice(dto);
    }
    
    @Mutation(() => UserDevice, { name: 'terminateUserDeviceAssignment' })
    async terminateUserDeviceAssignment(
        @Args('deviceId', { type: () => Int }) deviceId: number
    ): Promise<UserDevice | null> {
        return this.userDeviceService.terminateCurrentAssignment(deviceId);
    }
}