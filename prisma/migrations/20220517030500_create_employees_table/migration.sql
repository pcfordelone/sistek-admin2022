-- CreateTable
CREATE TABLE `employees` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `birthday` TIMESTAMP NULL,
    `vacation` TIMESTAMP NULL,
    `phone` VARCHAR(191) NULL,
    `position` VARCHAR(191) NULL,
    `avatar_url` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `a_complement` VARCHAR(191) NULL,
    `a_cep` VARCHAR(191) NULL,
    `a_city` VARCHAR(191) NULL,
    `a_state` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `employees_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
