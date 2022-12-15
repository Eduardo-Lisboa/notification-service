import { Content } from "@app/entities/content";
import { Notification, NotificationProps } from "@app/entities/notification";

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}): Notification {
    return new Notification({
        category: "social",
        content: new Content("voce recebeu uma solicitacao de amizade"),
        recipientId: "recipient-2",
        ...override,
    });
}
