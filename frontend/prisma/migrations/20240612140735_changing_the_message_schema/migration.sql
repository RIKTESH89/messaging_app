/*
  Warnings:

  - The primary key for the `ConversationParticipants` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `conversationId` on the `ConversationParticipants` table. All the data in the column will be lost.
  - You are about to drop the column `conversationId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the `Conversation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `recieverId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ConversationParticipants" DROP CONSTRAINT "ConversationParticipants_conversationId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_conversationId_fkey";

-- AlterTable
ALTER TABLE "ConversationParticipants" DROP CONSTRAINT "ConversationParticipants_pkey",
DROP COLUMN "conversationId",
ADD CONSTRAINT "ConversationParticipants_pkey" PRIMARY KEY ("userId");

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "conversationId",
ADD COLUMN     "recieverId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Conversation";
