import { CancelNotification } from "@app/use-cases/cancel-notifications";
import { CountRecipientNotifications } from "@app/use-cases/count-recipient-notifications";
import { GetRecipientNotifications } from "@app/use-cases/get-recipient-notifications";
import { ReadlNotification } from "@app/use-cases/read-notifications";
import { UnreadlNotification } from "@app/use-cases/unread-notification";
import { Module } from "@nestjs/common";
import { SendNotification } from "src/app/use-cases/send-notification";
import { DatabaseModule } from "../database/database.module";
import { NotificationsController } from "./controllers/notifications.controller";

@Module({
    imports: [DatabaseModule],
    controllers: [NotificationsController],
    providers: [
        SendNotification,
        CancelNotification,
        CountRecipientNotifications,
        GetRecipientNotifications,
        ReadlNotification,
        UnreadlNotification,
    ],
})
export class HttpModule {}
