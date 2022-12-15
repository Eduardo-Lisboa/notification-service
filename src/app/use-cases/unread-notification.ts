import { NotificationsRepository } from "../repositories/notifications-repository";
import { Injectable } from "@nestjs/common";
import { notificationNotFound } from "./errors/notification-not-found";

interface UnreadlNotificationRequest {
    notificationId: string;
}

type UnreadlNotificationResponse = void;

@Injectable()
export class UnreadlNotification {
    constructor(private notificationsRepository: NotificationsRepository) {}

    async execute(request: UnreadlNotificationRequest): Promise<UnreadlNotificationResponse> {
        const { notificationId } = request;

        const notification = await this.notificationsRepository.findById(notificationId);

        if (!notification) {
            throw new notificationNotFound();
        }

        notification.unread();

        await this.notificationsRepository.save(notification);
    }
}
