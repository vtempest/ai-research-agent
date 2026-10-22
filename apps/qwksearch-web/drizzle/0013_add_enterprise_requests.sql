CREATE TABLE `enterprise_requests` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`businessType` text NOT NULL,
	`teamSize` text NOT NULL,
	`message` text,
	`status` text DEFAULT 'sent' NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_enterprise_requests_createdAt` ON `enterprise_requests` (`createdAt`);
