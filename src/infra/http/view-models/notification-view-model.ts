import { Notification } from "@app/entities/notification";

export class NotificationVViewModels {
    static toHTTP(notification: Notification) {
        return {
            id: notification.id,
            content: notification.content.value,
            category: notification.category,
            recipientId: notification.recipientId,
        };
    }
}
