import { Injectable, Inject, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PgBoss } from 'pg-boss';
import { Job, JobOptions, ScheduleOptions, SendOptions, WorkOptions } from 'pg-boss/dist/types';


@Injectable()
export class PgBossService implements OnModuleInit, OnModuleDestroy {
    private boss: PgBoss;
    constructor() {
        this.boss = new PgBoss({
            host: 'localhost',
            port: 5433,
            database: 'trainingdb',
            user: 'postgres',
            password: '12345',
        });
    }
    async onModuleDestroy() {
        await this.boss.stop();
        console.log('PgBoss stopped');
    }   

    async onModuleInit() {
        this.boss.on('error', (error) => {
            console.error(error.stack);
        });

        await this.boss.start();
        console.log('PgBoss started');
    }

    async send(queue: string, data: any, options?: SendOptions, delay?: number): Promise<string | null> { 
        if (delay) {
            options = {...options, startAfter:delay};
        }
        return await this.boss.send(queue, data, options);
    }
    
    async work<T>(queue: string, handler: (job: Job<T>) => Promise<void>, options?: WorkOptions): Promise<string> {
        return await this.boss.work(queue, options || {}, async (jobs: Job<T>[]) => {
            for (const job of jobs) {
                try {
                    console.log(`starting job [${queue}]`);
                    await handler(job);
                    console.log(`Job completed [${queue}]`);
                }
                catch (error) {
                    console.error(`Job failed [${queue}]: ${error.message}`);
                }
            }
        });
        
    }

    async schedule(queue: string, cron: string, data?: any, options?: ScheduleOptions): Promise<void> {
        return await this.boss.schedule(queue, cron, data, options);
    }
    async unschedule(queue: string): Promise<void> {
        return await this.boss.unschedule(queue);
    }

    async ensureQueue(queue: string) {
        if (!(await this.boss.getQueue(queue))) {
            await this.boss.createQueue(queue);
        }
    }
}