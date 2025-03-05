CREATE TABLE IF NOT EXISTS `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`phone` varchar(20) NOT NULL,
	`password` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `lost_items` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`categories` enum('Others','Personal','Electronics','Gadgets','Documents','ID','Wearables','Accessories','Clothing','School Materials') DEFAULT 'Others',
	`location_lost` varchar(255),
	`date_lost` timestamp,
	`statuses` enum('pending','matched','resolved') DEFAULT 'pending',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp,
	CONSTRAINT `lost_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `found_items` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`user_id` int NOT NULL,
	`description` text,
	`categories` enum('Others','Personal','Electronics','Gadgets','Documents','ID','Wearables','Accessories','Clothing','School Materials') DEFAULT 'Others',
	`location_found` varchar(255),
	`date_found` timestamp,
	`statuses` enum('pending','matched','resolved') DEFAULT 'pending',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp,
	CONSTRAINT `found_items_id` PRIMARY KEY(`id`)
);
