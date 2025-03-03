CREATE TYPE "public"."board_status" AS ENUM('active', 'inactive');--> statement-breakpoint
CREATE TYPE "public"."medium_status" AS ENUM('active', 'inactive');--> statement-breakpoint
CREATE TABLE "board" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"status" "board_status" DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "medium" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"status" "medium_status" DEFAULT 'active' NOT NULL,
	"board_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "medium" ADD CONSTRAINT "medium_board_id_board_id_fk" FOREIGN KEY ("board_id") REFERENCES "public"."board"("id") ON DELETE cascade ON UPDATE no action;