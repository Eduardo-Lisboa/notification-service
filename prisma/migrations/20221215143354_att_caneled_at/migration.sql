/*
  Warnings:

  - You are about to drop the column `cancelledAt` on the `notification` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_notification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "recipientId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "readAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "canceledAt" DATETIME
);
INSERT INTO "new_notification" ("category", "content", "createdAt", "id", "readAt", "recipientId") SELECT "category", "content", "createdAt", "id", "readAt", "recipientId" FROM "notification";
DROP TABLE "notification";
ALTER TABLE "new_notification" RENAME TO "notification";
CREATE INDEX "notification_recipientId_idx" ON "notification"("recipientId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
