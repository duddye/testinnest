import { Injectable, OnModuleInit } from "@nestjs/common";
import { DeviceService } from "src/modules/device/Device.service";
import { UserService } from "src/modules/user/User.service";
import { JOB_QUEUES } from "./job-queues";
import { PgBossService } from "./pgboss.service";

@Injectable()
export class PgBossWorkersRegister implements OnModuleInit {
    constructor(
        private readonly pgBoss: PgBossService,
        private readonly userService: UserService,
        private readonly deviceService: DeviceService,
    ) {}

    async onModuleInit() {
        for (const queue of Object.values(JOB_QUEUES)) {
            await this.pgBoss.ensureQueue(queue);
        }
        await this.pgBoss.work(
            JOB_QUEUES.USER_CREATED,
            async (job) => {
                await this.userService.handleUserCreated(job.data);
            },
        );

        await this.pgBoss.work(
            JOB_QUEUES.DEVICE_ASSIGNED,
            async (job) => {
                await this.deviceService.handleDeviceAssigned(job.data);
            },
        );
    }
}
