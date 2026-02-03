import { Injectable, OnModuleInit } from '@nestjs/common';
import { PgBossService } from 'src/common/pgboss/pgboss.service';
import { Job } from 'pg-boss';
import { JOB_QUEUES } from 'src/common/pgboss/job-queues';

export interface UserCreatedJobData {
    userId: number;
    email: string;
    fullname: string;
}
export interface UserPasswordResetJobData {
    userId: number;
    email: string;
    resetToken: string;
}

@Injectable()
export class UserJobsWorker implements OnModuleInit {
    constructor(private readonly pgBoss: PgBossService) {}

    async onModuleInit() {
        await this.registerWorkers();
    }

    private async registerWorkers() {
        await this.pgBoss.work<UserCreatedJobData>(
        JOB_QUEUES.USER_CREATED,
        async (job) => {
            console.log(`Processing creation job for user ${job.data.userId}`);            
            await this.sendWelcomeEmail(job.data);
            console.log(`email sent to ${job.data.email}`);
        },
        {
            batchSize: 5
        });
        
        await this.pgBoss.work<UserPasswordResetJobData>(
        JOB_QUEUES.USER_PASSWORD_RESET,
        async (job) => {
            console.log(`Processing reset pwd job for user ${job.data.userId}`);
            await this.sendPasswordResetEmail(job.data);
            console.log(`Password reset email sent to ${job.data.email}`);
        });

        await this.pgBoss.work(
        JOB_QUEUES.USER_EMAIL_VERIFICATION,
        async (job) => {
            console.log(`rocessing EMAIL_VERIFICATION job`);
            await setTimeout(() => Promise.resolve(), 1000);
            console.log(`verification email sent`);
        });

        console.log('User job workers registered');
    }

    // MOLTO DUMMY: Simula invio email
    public async sendWelcomeEmail(data: UserCreatedJobData): Promise<void> {
        console.log(`
            ================================
            TO: ${data.email}
            SUBJECT: WELCOME ${data.fullname}!
            
            Hello ${data.fullname},
            
            Account created successfully!
            
            User ID: ${data.userId}
            Email: ${data.email}
            ================================
        `);
        await setTimeout(() => Promise.resolve(), 500);
    }

    public async sendPasswordResetEmail(data: UserPasswordResetJobData): Promise<void> {
        console.log(`
        ================================
        TO: ${data.email}
        SUBJECT: REset your password.
        
        Hello,
        
        To reset your password, use the following token:
        
        Reset Token: ABCDEFGHIJKLMNOP
        ================================
        `);
        
        await setTimeout(() => Promise.resolve(), 500);
    }
}