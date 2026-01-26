import { Controller, Get, Post, Patch, Delete, Body, Param, Put, ValidationPipe } from "@nestjs/common";
import { UserService } from "./User.service";
import { CreateUserDto } from "./user-dto/CreateUserDto";
import { UpdateUserCredDto } from "./user-dto/UpdateUserCredDto";
import { UpdateUserDto } from "./user-dto/UpdateUserDto";
import { BaseController } from "src/common/base/base.controller";
import { User } from "./User";
import { UseGuards } from "@nestjs/common";
import { JoseAuthGuard } from "src/common/auth/jose-auth.guard";

@UseGuards(JoseAuthGuard)
@Controller('users')
export class UserController extends BaseController<User, CreateUserDto, UpdateUserDto> {    
    constructor(private readonly userService: UserService) {
        super(userService)
    }

    @Patch(':id/cred') 
    async updateUserCred(@Param('id') id: number, @Body() userDto: UpdateUserCredDto): Promise<User | null> {
        return this.userService.updateUserCred(id, userDto);
    }
}