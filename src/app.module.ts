import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/User.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './modules/user/User';
import { DeviceModule } from './modules/device/Device.module';
import { Device } from './modules/device/Device';
import { UserDevice } from './modules/user-device/UserDevice';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UserDeviceModule } from './modules/user-device/UserDevice.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,  // interfaccia testing query
    }), 
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: '12345',
      database: 'trainingdb',

      models: [User, Device, UserDevice], // con autoloadModels true non serve in realtà
      autoLoadModels: true,
      logging: console.log,
      define: {
        timestamps: true,
        underscored: false, 
      },
    }),

    UserModule, DeviceModule, UserDeviceModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
