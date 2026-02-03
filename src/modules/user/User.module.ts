import { forwardRef, Module } from '@nestjs/common';
import { UserRepository } from './User.repository';
import { UserService } from './User.service';
import { UserController } from './User.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './User';
import { UserDevice } from '../user-device/UserDevice';
import { UserResolver } from './User.resolver';
import { UserJobsWorker } from './user.jobs';
import { PgBossModule } from 'src/common/pgboss/pgboss.module';

@Module({
    imports: [SequelizeModule.forFeature([User, UserDevice]), 
    forwardRef(() => PgBossModule)],

    providers: [UserService, UserRepository, UserResolver, UserJobsWorker],
    controllers: [UserController],
    exports: [UserService, UserRepository, UserJobsWorker],
})
export class UserModule {}
