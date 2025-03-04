CREATE TABLE IF NOT EXISTS `usertry` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`age` int NOT NULL,
	CONSTRAINT `usertry_id` PRIMARY KEY(`id`)
);
