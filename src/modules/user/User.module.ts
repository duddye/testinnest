import { Module } from '@nestjs/common';
import { UserRepository } from './User.repository';
import { UserService } from './User.service';
import { UserController } from './User.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './User';
import { UserDevice } from '../user-device/UserDevice';
import { UserResolver } from './User.resolver';

@Module({
    imports: [SequelizeModule.forFeature([User, UserDevice])],
    providers: [UserService, UserRepository, UserResolver],
    controllers: [UserController],
    exports: [UserService, UserRepository],
})
export class UserModule {}
