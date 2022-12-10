/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `resetExp` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `resetPass` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_resetPass_key";

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
DROP COLUMN "resetExp",
DROP COLUMN "resetPass",
DROP COLUMN "username";
