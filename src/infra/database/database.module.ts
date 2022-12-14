import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { NotificationsRepository } from "src/app/repositories/notifications-repository";
import { PrimsaNotificationsRepository } from "./prisma/repositories/prisma-notifications-repositorie";

@Module({
    providers: [
        PrismaService,
        {
            provide: NotificationsRepository,
            useClass: PrimsaNotificationsRepository,
        },
    ],

    exports: [NotificationsRepository],
})
export class DatabaseModule {}
