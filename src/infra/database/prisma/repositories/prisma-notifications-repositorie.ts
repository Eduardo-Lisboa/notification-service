import { Notification } from "@app/entities/notification";
import { NotificationsRepository } from "@app/repositories/notifications-repository";
import { PrismaService } from "./../prisma.service";
import { Injectable } from "@nestjs/common";
import { PrismaNotificationMapper } from "../mappers/prisma-notification-mapper";

@Injectable()
export class PrimsaNotificationsRepository implements NotificationsRepository {
    constructor(private PrismaService: PrismaService) {}

    async findById(notificationId: string): Promise<Notification | null> {
        throw new Error("Method not implemented.");
    }

    async save(notification: Notification): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async create(notification: Notification): Promise<void> {
        const raw = PrismaNotificationMapper.toPrisma(notification);

        await this.PrismaService.notification.create({
            data: raw,
        });
    }
}
