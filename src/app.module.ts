import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/User.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './modules/user/User';
import { DeviceModule } from './modules/device/Device.module';
import { Device } from './modules/device/Device';
import { UserDevice } from './modules/user-device/UserDevice';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: '12345',
      database: 'trainingdb',

      models: [User, Device, UserDevice],
      autoLoadModels: true,
      logging: console.log,
      define: {
        timestamps: true,
        underscored: false, 
      },
    }),

    UserModule, DeviceModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
