import { Body, Controller, Post, Patch, Param, Get } from "@nestjs/common";
import { CreateNotificationBody } from "../dtos/create-notification-body";
import { SendNotification } from "./../../../app/use-cases/send-notification";
import { NotificationVViewModels } from "./../view-models/notification-view-model";
import { CancelNotification } from "./../../../app/use-cases/cancel-notifications";
import { ReadlNotification } from "./../../../app/use-cases/read-notifications";
import { UnreadlNotification } from "./../../../app/use-cases/unread-notification";
import { CountRecipientNotifications } from "@app/use-cases/count-recipient-notifications";
import { GetRecipientNotifications } from "./../../../app/use-cases/get-recipient-notifications";

@Controller("notifications")
export class NotificationsController {
    constructor(
        private SendNotification: SendNotification,
        private cancelNotification: CancelNotification,
        private readlNotification: ReadlNotification,
        private unreadlNotification: UnreadlNotification,
        private countRecipientNotifications: CountRecipientNotifications,
        private getRecipientNotifications: GetRecipientNotifications,
    ) {}

    @Patch(":id/cancel")
    async cancel(@Param("id") id: string) {
        await this.cancelNotification.execute({
            notificationId: id,
        });
    }

    @Get("count/from/:recipientId")
    async countFromRecipient(@Param("recipientId") recipientId: string) {
        const { count } = await this.countRecipientNotifications.execute({
            recipientId,
        });

        return {
            count,
        };
    }

    @Get("from/:recipientId")
    async getFromRecipient(@Param("recipientId") recipientId: string) {
        const { notifications } = await this.getRecipientNotifications.execute({
            recipientId,
        });
        return {
            notifications: notifications.map(NotificationVViewModels.toHTTP),
        };
    }

    @Patch(":id/read")
    async read(@Param("id") id: string) {
        await this.readlNotification.execute({
            notificationId: id,
        });
    }

    @Patch(":id/unread")
    async unread(@Param("id") id: string) {
        await this.unreadlNotification.execute({
            notificationId: id,
        });
    }

    @Post()
    async create(@Body() body: CreateNotificationBody) {
        const { content, category, recipientId } = body;

        const { notification } = await this.SendNotification.execute({
            content,
            category,
            recipientId,
        });

        return {
            notification: NotificationVViewModels.toHTTP(notification),
        };
    }
}
