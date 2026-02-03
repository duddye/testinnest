import { forwardRef, Module } from '@nestjs/common';
import { PgBossService } from './pgboss.service';
import { UserModule } from 'src/modules/user/User.module';
import { PgBossWorkersRegister } from './pgboss.worker';
import { DeviceModule } from 'src/modules/device/Device.module';

@Module({
  imports: [forwardRef(() => UserModule), forwardRef(() => DeviceModule)],
  providers: [PgBossService, PgBossWorkersRegister],
  exports: [PgBossService],
})
export class PgBossModule {}
