import { InMemorynotificationsRepository } from "@test/repositories/in-memory-notifications-respository";
import { notificationNotFound } from "./errors/notification-not-found";
import { makeNotification } from "./../../../test/factories/notification-factory";
import { ReadlNotification } from "./read-notifications";

describe("Read Notification", () => {
    it("should be able to Read a notification", async () => {
        const notificationsRepository = new InMemorynotificationsRepository();
        const readNotification = new ReadlNotification(notificationsRepository);

        const notification = makeNotification();

        await notificationsRepository.create(notification);

        await readNotification.execute({
            notificationId: notification.id,
        });

        expect(notificationsRepository.notifications[0].readAt).toEqual(expect.any(Date));
    });

    it("should not be able to read notification when it does not exist", async () => {
        const notificationsRepository = new InMemorynotificationsRepository();
        const readNotification = new ReadlNotification(notificationsRepository);

        expect(() => {
            return readNotification.execute({
                notificationId: "fake-notification-id",
            });
        }).rejects.toThrow(notificationNotFound);
    });
});
