/*
  Warnings:

  - You are about to alter the column `birthday` on the `employees` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `vacation` on the `employees` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - A unique constraint covering the columns `[user_id]` on the table `employees` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `employees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `employees` ADD COLUMN `user_id` VARCHAR(191) NOT NULL,
    MODIFY `birthday` TIMESTAMP NULL,
    MODIFY `vacation` TIMESTAMP NULL;

-- CreateIndex
CREATE UNIQUE INDEX `employees_user_id_key` ON `employees`(`user_id`);

-- AddForeignKey
ALTER TABLE `employees` ADD CONSTRAINT `employees_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
