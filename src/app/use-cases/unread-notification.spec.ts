import { InMemorynotificationsRepository } from "@test/repositories/in-memory-notifications-respository";
import { notificationNotFound } from "./errors/notification-not-found";
import { makeNotification } from "./../../../test/factories/notification-factory";
import { UnreadlNotification } from "./unread-notification";

describe("Unread Notification", () => {
    it("should be able to Unread a notification", async () => {
        const notificationsRepository = new InMemorynotificationsRepository();
        const unreadNotification = new UnreadlNotification(notificationsRepository);

        const notification = makeNotification({
            readAt: new Date(),
        });

        await notificationsRepository.create(notification);

        await unreadNotification.execute({
            notificationId: notification.id,
        });

        expect(notificationsRepository.notifications[0].readAt).toBeNull();
    });

    it("should not be able to unread notification when it does not exist", async () => {
        const notificationsRepository = new InMemorynotificationsRepository();
        const unreadNotification = new UnreadlNotification(notificationsRepository);

        expect(() => {
            return unreadNotification.execute({
                notificationId: "fake-notification-id",
            });
        }).rejects.toThrow(notificationNotFound);
    });
});
