ALTER TABLE "categories" DROP CONSTRAINT "categories_parent_id_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "category_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;