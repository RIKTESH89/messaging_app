/*
  Warnings:

  - You are about to drop the `ConversationParticipants` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ConversationParticipants" DROP CONSTRAINT "ConversationParticipants_userId_fkey";

-- DropTable
DROP TABLE "ConversationParticipants";
