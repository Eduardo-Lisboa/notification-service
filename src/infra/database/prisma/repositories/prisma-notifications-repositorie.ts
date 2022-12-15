import { Notification } from "@app/entities/notification";
import { NotificationsRepository } from "@app/repositories/notifications-repository";
import { PrismaService } from "./../prisma.service";
import { Injectable } from "@nestjs/common";
import { PrismaNotificationMapper } from "../mappers/prisma-notification-mapper";

@Injectable()
export class PrimsaNotificationsRepository implements NotificationsRepository {
    constructor(private PrismaService: PrismaService) {}

    async countManyByRecipientId(recipientId: string): Promise<number> {
        const count = await this.PrismaService.notification.count({
            where: {
                recipientId,
            },
        });
        return count;
    }
    async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
        const notifications = await this.PrismaService.notification.findMany({
            where: {
                recipientId,
            },
        });

        return notifications.map(PrismaNotificationMapper.toDomain);
    }

    async findById(notificationId: string): Promise<Notification | null> {
        const notification = await this.PrismaService.notification.findUnique({
            where: {
                id: notificationId,
            },
        });
        if (!notification) {
            return null;
        }
        return PrismaNotificationMapper.toDomain(notification);
    }

    async save(notification: Notification): Promise<void> {
        const raw = PrismaNotificationMapper.toPrisma(notification);

        await this.PrismaService.notification.update({
            where: {
                id: raw.id,
            },
            data: raw,
        });
    }

    async create(notification: Notification): Promise<void> {
        const raw = PrismaNotificationMapper.toPrisma(notification);

        await this.PrismaService.notification.create({
            data: raw,
        });
    }
}
