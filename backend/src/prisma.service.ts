import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }
}