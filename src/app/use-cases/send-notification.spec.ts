import { InMemorynotificationsRepository } from "../../../test/repositories/in-memory-notifications-respository";
import { SendNotification } from "./send-notification";

describe("Send Notification", () => {
    it("should send a notification", async () => {
        const notificationsRepository = new InMemorynotificationsRepository();
        const sendNotification = new SendNotification(notificationsRepository);

        const { notification } = await sendNotification.execute({
            content: "voce recebeu uma solicitacao de amizade",
            category: "social",
            recipientId: "123456789",
        });

        expect(notificationsRepository.notifications).toHaveLength(1);
        expect(notificationsRepository.notifications[0]).toEqual(notification);
    });
});
