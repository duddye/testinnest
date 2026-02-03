import { Injectable, NotFoundException } from "@nestjs/common";
import { BaseService } from "src/common/base/base.service";
import { User } from "./User";
import { UpdateUserCredDto } from "./user-dto/UpdateUserCredDto";
import { UserRepository } from "./User.repository";
import { UserJobsWorker } from "./user.jobs";
import { PgBossService } from "src/common/pgboss/pgboss.service";
import { JOB_QUEUES } from "src/common/pgboss/job-queues";

@Injectable()
export class UserService extends BaseService<User> {
    constructor(
        protected readonly userRepository: UserRepository,
        private readonly userJobs: UserJobsWorker,
        private readonly pgBoss: PgBossService
    ) {
        super(userRepository);
    }

    async create(dto: any): Promise<User> {
        const existingUser = await this.userRepository.getByField('email', dto.email.toLowerCase());
        if (existingUser) throw new NotFoundException(`User with email '${dto.email}' already exists`);
        const user = await this.userRepository.create(dto);
        await this.pgBoss.send(JOB_QUEUES.USER_CREATED, { userId: user.id, email: user.email, fullname: user.fullname });
        return user;
    }

    async updateUserCred(id: number, dto: UpdateUserCredDto): Promise<User | null> {
        const user = await this.userRepository.updateCred(id, dto);
        if (!user) throw new NotFoundException(`User with id '${id}' not found`);
        return user;
    }

    async handleUserCreated(data: any): Promise<void> {
        console.log("Handling user created event with data:", data);
        await this.userJobs.sendWelcomeEmail({userId: data.userId, email: data.email, fullname: data.fullname});
    }
}