import { NotificationsRepository } from "../repositories/notifications-repository";
import { Injectable } from "@nestjs/common";
import { notificationNotFound } from "./errors/notification-not-found";

interface ReadlNotificationRequest {
    notificationId: string;
}

type ReadlNotificationResponse = void;

@Injectable()
export class ReadlNotification {
    constructor(private notificationsRepository: NotificationsRepository) {}

    async execute(request: ReadlNotificationRequest): Promise<ReadlNotificationResponse> {
        const { notificationId } = request;

        const notification = await this.notificationsRepository.findById(notificationId);

        if (!notification) {
            throw new notificationNotFound();
        }

        notification.read();

        await this.notificationsRepository.save(notification);
    }
}
