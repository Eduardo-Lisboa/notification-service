import { Content } from "@app/entities/content";
import { Notification } from "@app/entities/notification";
import { InMemorynotificationsRepository } from "@test/repositories/in-memory-notifications-respository";
import { CountRecipientNotifications } from "./count-recipient-notifications";
import { makeNotification } from "./../../../test/factories/notification-factory";

describe("Count recipients notifications", () => {
    it("should be able to count recipient notifications", async () => {
        const notificationsRepository = new InMemorynotificationsRepository();
        const countRecipientNotifications = new CountRecipientNotifications(notificationsRepository);

        await notificationsRepository.create(makeNotification({ recipientId: "recipient-1" }));
        await notificationsRepository.create(makeNotification({ recipientId: "recipient-1" }));
        await notificationsRepository.create(makeNotification({ recipientId: "recipient-2" }));

        const { count } = await countRecipientNotifications.execute({
            recipientId: "recipient-1",
        });

        expect(count).toEqual(2);
    });
});
