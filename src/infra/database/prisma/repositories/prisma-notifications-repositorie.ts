import { Notification } from "../../../../app/entities/notification";
import { NotificationsRepository } from "../../../../app/repositories/notifications-repository";
import { PrismaService } from "./../prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrimsaNotificationsRepository implements NotificationsRepository {
    constructor(private PrismaService: PrismaService) {}

    async create(notification: Notification): Promise<void> {
        await this.PrismaService.notification.create({
            data: {
                id: notification.id,
                content: notification.content.value,
                category: notification.category,
                recipientId: notification.recipientId,
                readAt: notification.readAt,
                createdAt: notification.createdAt,
            },
        });
    }
}
