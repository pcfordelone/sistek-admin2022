/*
  Warnings:

  - You are about to alter the column `birthday` on the `employees` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `vacation` on the `employees` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - Added the required column `employee_id` to the `pay_stubs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `employees` MODIFY `birthday` TIMESTAMP NULL,
    MODIFY `vacation` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `pay_stubs` ADD COLUMN `employee_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `pay_stubs` ADD CONSTRAINT `pay_stubs_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
