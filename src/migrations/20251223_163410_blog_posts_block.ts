import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_blog_posts_settings_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_blog_posts_settings_anchor_id" AS ENUM('contact-form', 'services', 'testimonials', 'video', 'industries', 'suite');
  CREATE TYPE "public"."enum_pages_blocks_blog_posts_columns" AS ENUM('2', '3', '4');
  CREATE TABLE "pages_blocks_blog_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_theme" "enum_pages_blocks_blog_posts_settings_theme" DEFAULT 'light',
  	"settings_anchor_id" "enum_pages_blocks_blog_posts_settings_anchor_id",
  	"posts_per_page" numeric DEFAULT 9,
  	"columns" "enum_pages_blocks_blog_posts_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_blog_posts" ADD CONSTRAINT "pages_blocks_blog_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_blog_posts_order_idx" ON "pages_blocks_blog_posts" USING btree ("_order");
  CREATE INDEX "pages_blocks_blog_posts_parent_id_idx" ON "pages_blocks_blog_posts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_blog_posts_path_idx" ON "pages_blocks_blog_posts" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_blog_posts" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_blog_posts_settings_theme";
  DROP TYPE "public"."enum_pages_blocks_blog_posts_settings_anchor_id";
  DROP TYPE "public"."enum_pages_blocks_blog_posts_columns";`)
}
