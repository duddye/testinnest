import { Module } from "@nestjs/common";
import { JoseAuthGuard } from "./jose-auth.guard";

@Module({
    providers: [JoseAuthGuard],
    exports: [JoseAuthGuard],
})
export class AuthModule {}