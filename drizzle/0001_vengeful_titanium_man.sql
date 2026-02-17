CREATE TABLE "coke_log" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"coke_type" text NOT NULL,
	"format" text NOT NULL,
	"size_ml" integer NOT NULL,
	"notes" text,
	"is_public" boolean DEFAULT false NOT NULL,
	"consumed_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "username" text;--> statement-breakpoint
ALTER TABLE "coke_log" ADD CONSTRAINT "coke_log_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "coke_log_userId_idx" ON "coke_log" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "coke_log_consumedAt_idx" ON "coke_log" USING btree ("consumed_at");--> statement-breakpoint
CREATE INDEX "coke_log_isPublic_idx" ON "coke_log" USING btree ("is_public");--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_username_unique" UNIQUE("username");