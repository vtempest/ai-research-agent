-- Migration: Migrate data from 'users' table to 'user' table
-- Source table structure:
-- users: id, name, email, password, avatar_url, is_verified, is_admin, modified_at, 
--        api_key, settings, emailVerified, image, created_at, subscription

-- 1. Create the target 'user' table if it doesn't exist
CREATE TABLE IF NOT EXISTS `user` (
	`settings` text DEFAULT '',
	`subscription` text DEFAULT '',
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`email_verified` integer NOT NULL,
	`image` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);

-- 2. Create unique index if it doesn't exist
CREATE UNIQUE INDEX IF NOT EXISTS `user_email_unique` ON `user` (`email`);

-- 3. Backup existing users data
CREATE TABLE `users_backup` AS SELECT * FROM `users`;

-- 4. Migrate data from 'users' to 'user' table with exact field mapping
INSERT OR IGNORE INTO `user` (
    `id`,
    `name`,
    `email`,
    `email_verified`,
    `image`,
    `settings`,
    `subscription`,
    `created_at`,
    `updated_at`
)
SELECT 
    `id`,
    `name`,
    `email`,
    
    -- Map email verification (prioritize emailVerified over is_verified)
    CASE 
        WHEN `emailVerified` IS NOT NULL THEN `emailVerified`
        WHEN `is_verified` IS NOT NULL THEN `is_verified`
        ELSE 0
    END as `email_verified`,
    
    -- Map image field (prioritize image over avatar_url)
    COALESCE(`image`, `avatar_url`) as `image`,
    
    -- Map settings field
    COALESCE(`settings`, '') as `settings`,
    
    -- Map subscription field (convert boolean to text)
    CASE 
        WHEN `subscription` = 1 THEN 'active'
        WHEN `subscription` = 0 THEN 'inactive'
        ELSE ''
    END as `subscription`,
    
    -- Map created_at timestamp
    CASE 
        WHEN `created_at` IS NOT NULL THEN `created_at`
        ELSE strftime('%s', 'now')
    END as `created_at`,
    
    -- Map updated_at timestamp (use modified_at if available)
    CASE 
        WHEN `modified_at` IS NOT NULL THEN `modified_at`
        WHEN `created_at` IS NOT NULL THEN `created_at`
        ELSE strftime('%s', 'now')
    END as `updated_at`

FROM `users_backup`
WHERE 
    `id` IS NOT NULL 
    AND `id` != ''
    AND `email` IS NOT NULL 
    AND `email` != ''
    AND `name` IS NOT NULL
    AND `name` != '';

-- 5. Update any files that were owned by users to reference the new user table
UPDATE `files` 
SET `ownerId` = (
    SELECT u.`id`
    FROM `user` u
    WHERE u.`id` = `files`.`ownerId`
    LIMIT 1
)
WHERE EXISTS (
    SELECT 1 FROM `user` u 
    WHERE u.`id` = `files`.`ownerId`
);

-- 6. Update any accounts that reference the old users table
UPDATE `account` 
SET `user_id` = (
    SELECT u.`id`
    FROM `user` u
    WHERE u.`id` = `account`.`user_id`
    LIMIT 1
)
WHERE EXISTS (
    SELECT 1 FROM `user` u 
    WHERE u.`id` = `account`.`user_id`
);

-- 7. Update user_file_index if it references user IDs
UPDATE `user_file_index` 
SET `user_id` = (
    SELECT u.`id`
    FROM `user` u
    WHERE u.`id` = `user_file_index`.`user_id`
    LIMIT 1
)
WHERE EXISTS (
    SELECT 1 FROM `user` u 
    WHERE u.`id` = `user_file_index`.`user_id`
);

-- 8. Optional: Drop the old users table after successful migration
-- Uncomment the line below if you want to remove the old table
-- DROP TABLE `users`;

-- 9. Clean up backup table
DROP TABLE `users_backup`;