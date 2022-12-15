import { Notification } from "@app/entities/notification";
import { NotificationsRepository } from "@app/repositories/notifications-repository";

export class InMemorynotificationsRepository implements NotificationsRepository {
    public notifications: Notification[] = [];

    async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
        const notifications = this.notifications.filter(iten => iten.recipientId === recipientId);

        return notifications;
    }

    async findById(notificationId: string): Promise<Notification | null> {
        const notification = this.notifications.find(iten => iten.id === notificationId);

        if (!notification) {
            return null;
        }

        return notification;
    }

    async countManyByRecipientId(recipientId: string): Promise<number> {
        const count = this.notifications.filter(iten => iten.recipientId === recipientId).length;

        return count;
    }

    async create(notification: Notification) {
        this.notifications.push(notification);
    }

    async save(notification: Notification): Promise<void> {
        const notificationIndex = this.notifications.findIndex(iten => iten.id === notification.id);

        if (notificationIndex >= 0) {
            this.notifications[notificationIndex] = notification;
        }
    }
}
