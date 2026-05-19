CREATE TABLE `commentUsers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`username` varchar(100) NOT NULL,
	`avatarUrl` varchar(500) NOT NULL DEFAULT 'https://d2xsxph8kpxj0f.cloudfront.net/310519663459369152/U4uk4qUHrVwLe3aeYcVAQS/avatar-football-red-1-fah8CnpdjT3c5wey5oKUaC.png',
	`verificationCode` varchar(6),
	`isVerified` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `commentUsers_id` PRIMARY KEY(`id`),
	CONSTRAINT `commentUsers_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `comments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`postId` int NOT NULL,
	`userId` int NOT NULL,
	`content` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `comments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `fixtures` (
	`id` int AUTO_INCREMENT NOT NULL,
	`opponent` varchar(255) NOT NULL,
	`homeAway` enum('home','away') NOT NULL,
	`matchDate` timestamp NOT NULL,
	`kickOffTime` varchar(50),
	`competition` varchar(255) NOT NULL,
	`venue` varchar(255),
	`status` enum('upcoming','postponed','cancelled') NOT NULL DEFAULT 'upcoming',
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `fixtures_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lineups` (
	`id` int AUTO_INCREMENT NOT NULL,
	`matchId` varchar(255) NOT NULL,
	`opponent` varchar(255) NOT NULL,
	`matchDate` timestamp NOT NULL,
	`lineup` text NOT NULL,
	`formation` varchar(50),
	`source` varchar(100) DEFAULT 'flashscore',
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `lineups_id` PRIMARY KEY(`id`),
	CONSTRAINT `lineups_matchId_unique` UNIQUE(`matchId`)
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`excerpt` text NOT NULL,
	`content` text NOT NULL,
	`category` varchar(100) NOT NULL,
	`author` varchar(255) NOT NULL,
	`authorUrl` varchar(500),
	`imageUrl` varchar(500),
	`publishedDate` timestamp NOT NULL,
	`status` enum('draft','submitted','approved','rejected','published') NOT NULL DEFAULT 'draft',
	`submittedBy` varchar(255),
	`submittedAt` timestamp,
	`rejectionReason` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `posts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `results` (
	`id` int AUTO_INCREMENT NOT NULL,
	`opponent` varchar(255) NOT NULL,
	`homeAway` enum('home','away') NOT NULL,
	`lincolnCityGoals` int NOT NULL,
	`opponentGoals` int NOT NULL,
	`matchDate` timestamp NOT NULL,
	`competition` varchar(255) NOT NULL,
	`venue` varchar(255),
	`goalscorers` text,
	`attendance` int,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `results_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`username` varchar(255),
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`),
	CONSTRAINT `users_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
CREATE TABLE `verificationCodes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`code` varchar(6) NOT NULL,
	`expiresAt` timestamp NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `verificationCodes_id` PRIMARY KEY(`id`)
);
