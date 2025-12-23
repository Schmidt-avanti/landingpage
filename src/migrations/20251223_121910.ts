import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DO $$ BEGIN CREATE TYPE "public"."enum_pages_blocks_service_grid_settings_anchor_id" AS ENUM('contact-form', 'services', 'testimonials', 'video', 'industries', 'suite'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum_pages_blocks_additional_services_settings_anchor_id" AS ENUM('contact-form', 'services', 'testimonials', 'video', 'industries', 'suite'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum_pages_blocks_industries_grid_settings_theme" AS ENUM('light', 'dark'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum_pages_blocks_industries_grid_settings_anchor_id" AS ENUM('contact-form', 'services', 'testimonials', 'video', 'industries', 'suite'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum_pages_blocks_testimonials_settings_anchor_id" AS ENUM('contact-form', 'services', 'testimonials', 'video', 'industries', 'suite'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum_pages_blocks_logo_ticker_settings_anchor_id" AS ENUM('contact-form', 'services', 'testimonials', 'video', 'industries', 'suite'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum_pages_blocks_content_side_by_side_settings_anchor_id" AS ENUM('contact-form', 'services', 'testimonials', 'video', 'industries', 'suite'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum_pages_blocks_content_side_by_side_cta_link_type" AS ENUM('page', 'anchor'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum_pages_blocks_content_side_by_side_cta_anchor" AS ENUM('contact-form', 'services', 'testimonials', 'video', 'industries', 'suite'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum_pages_blocks_video_block_settings_anchor_id" AS ENUM('contact-form', 'services', 'testimonials', 'video', 'industries', 'suite'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum_pages_blocks_contact_form_settings_anchor_id" AS ENUM('contact-form', 'services', 'testimonials', 'video', 'industries', 'suite'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum_pages_blocks_accordion_settings_theme" AS ENUM('light', 'dark'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum_pages_blocks_accordion_settings_anchor_id" AS ENUM('contact-form', 'services', 'testimonials', 'video', 'industries', 'suite'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum_pages_blocks_rich_text_content_settings_theme" AS ENUM('light', 'dark'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum_pages_blocks_rich_text_content_settings_anchor_id" AS ENUM('contact-form', 'services', 'testimonials', 'video', 'industries', 'suite'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum_pages_blocks_text_block_settings_theme" AS ENUM('light', 'dark'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum_pages_blocks_text_block_settings_anchor_id" AS ENUM('contact-form', 'services', 'testimonials', 'video', 'industries', 'suite'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum_industries_selected_icon" AS ENUM('Home', 'ShoppingCart', 'Car', 'Store', 'Heart', 'Stethoscope', 'Scale', 'Utensils', 'Hammer', 'Building2', 'Armchair', 'Shield', 'Hotel', 'Building', 'Factory', 'Package', 'Briefcase', 'GraduationCap'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum_site_settings_navigation_link_type" AS ENUM('page', 'anchor'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum_site_settings_navigation_anchor_link" AS ENUM('contact-form', 'services', 'testimonials', 'video', 'industries', 'suite'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum_site_settings_cta_type" AS ENUM('link', 'phone'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar NOT NULL,
  	"subheadline" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_industries_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_theme" "enum_pages_blocks_industries_grid_settings_theme" DEFAULT 'light',
  	"settings_anchor_id" "enum_pages_blocks_industries_grid_settings_anchor_id",
  	"tagline" varchar DEFAULT 'Unsere Branchen',
  	"headline" varchar DEFAULT 'avanti unterstützt kleinere und mittlere Unternehmen' NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"content" jsonb NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_theme" "enum_pages_blocks_accordion_settings_theme" DEFAULT 'light',
  	"settings_anchor_id" "enum_pages_blocks_accordion_settings_anchor_id",
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_rich_text_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_theme" "enum_pages_blocks_rich_text_content_settings_theme" DEFAULT 'light',
  	"settings_anchor_id" "enum_pages_blocks_rich_text_content_settings_anchor_id",
  	"content" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_text_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_theme" "enum_pages_blocks_text_block_settings_theme" DEFAULT 'light',
  	"settings_anchor_id" "enum_pages_blocks_text_block_settings_anchor_id",
  	"content" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "industries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"selected_icon" "enum_industries_selected_icon",
  	"icon_id" integer,
  	"description" varchar,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "site_settings_navigation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link_type" "enum_site_settings_navigation_link_type" DEFAULT 'page',
  	"page_link" varchar,
  	"anchor_link" "enum_site_settings_navigation_anchor_link"
  );
  
  ALTER TABLE "pages_blocks_hero_bento_cards" ADD COLUMN IF NOT EXISTS "stat_background_image_id" integer;
  ALTER TABLE "pages_blocks_service_grid" ADD COLUMN IF NOT EXISTS "settings_anchor_id" "enum_pages_blocks_service_grid_settings_anchor_id";
  ALTER TABLE "pages_blocks_additional_services" ADD COLUMN IF NOT EXISTS "settings_anchor_id" "enum_pages_blocks_additional_services_settings_anchor_id";
  ALTER TABLE "pages_blocks_testimonials" ADD COLUMN IF NOT EXISTS "settings_anchor_id" "enum_pages_blocks_testimonials_settings_anchor_id";
  ALTER TABLE "pages_blocks_logo_ticker" ADD COLUMN IF NOT EXISTS "settings_anchor_id" "enum_pages_blocks_logo_ticker_settings_anchor_id";
  ALTER TABLE "pages_blocks_content_side_by_side" ADD COLUMN IF NOT EXISTS "settings_anchor_id" "enum_pages_blocks_content_side_by_side_settings_anchor_id";
  ALTER TABLE "pages_blocks_content_side_by_side" ADD COLUMN IF NOT EXISTS "cta_link_type" "enum_pages_blocks_content_side_by_side_cta_link_type" DEFAULT 'page';
  ALTER TABLE "pages_blocks_content_side_by_side" ADD COLUMN IF NOT EXISTS "cta_anchor" "enum_pages_blocks_content_side_by_side_cta_anchor";
  ALTER TABLE "pages_blocks_video_block" ADD COLUMN IF NOT EXISTS "settings_anchor_id" "enum_pages_blocks_video_block_settings_anchor_id";
  ALTER TABLE "pages_blocks_contact_form" ADD COLUMN IF NOT EXISTS "settings_anchor_id" "enum_pages_blocks_contact_form_settings_anchor_id";
  ALTER TABLE "pages_rels" ADD COLUMN IF NOT EXISTS "industries_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "industries_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "award_enabled" boolean DEFAULT false;
  ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "award_image_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "award_title" varchar DEFAULT 'Business Innovator 2024';
  ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "award_description" jsonb;
  ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "cta_type" "enum_site_settings_cta_type" DEFAULT 'link';
  ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "cta_text" varchar DEFAULT 'Kontakt';
  ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "cta_link" varchar;
  ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "cta_phone" varchar;
  DO $$ BEGIN ALTER TABLE "pages_blocks_page_hero" ADD CONSTRAINT "pages_blocks_page_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN ALTER TABLE "pages_blocks_page_hero" ADD CONSTRAINT "pages_blocks_page_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN ALTER TABLE "pages_blocks_industries_grid" ADD CONSTRAINT "pages_blocks_industries_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN ALTER TABLE "pages_blocks_accordion_items" ADD CONSTRAINT "pages_blocks_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_accordion"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN ALTER TABLE "pages_blocks_accordion" ADD CONSTRAINT "pages_blocks_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN ALTER TABLE "pages_blocks_rich_text_content" ADD CONSTRAINT "pages_blocks_rich_text_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN ALTER TABLE "pages_blocks_text_block" ADD CONSTRAINT "pages_blocks_text_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN ALTER TABLE "industries" ADD CONSTRAINT "industries_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN ALTER TABLE "site_settings_navigation" ADD CONSTRAINT "site_settings_navigation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_hero_order_idx" ON "pages_blocks_page_hero" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_hero_parent_id_idx" ON "pages_blocks_page_hero" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_hero_path_idx" ON "pages_blocks_page_hero" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_hero_image_idx" ON "pages_blocks_page_hero" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_industries_grid_order_idx" ON "pages_blocks_industries_grid" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_industries_grid_parent_id_idx" ON "pages_blocks_industries_grid" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_industries_grid_path_idx" ON "pages_blocks_industries_grid" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_accordion_items_order_idx" ON "pages_blocks_accordion_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_accordion_items_parent_id_idx" ON "pages_blocks_accordion_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_accordion_order_idx" ON "pages_blocks_accordion" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_accordion_parent_id_idx" ON "pages_blocks_accordion" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_accordion_path_idx" ON "pages_blocks_accordion" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_rich_text_content_order_idx" ON "pages_blocks_rich_text_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_rich_text_content_parent_id_idx" ON "pages_blocks_rich_text_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_rich_text_content_path_idx" ON "pages_blocks_rich_text_content" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_text_block_order_idx" ON "pages_blocks_text_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_text_block_parent_id_idx" ON "pages_blocks_text_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_text_block_path_idx" ON "pages_blocks_text_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "industries_icon_idx" ON "industries" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "industries_updated_at_idx" ON "industries" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "industries_created_at_idx" ON "industries" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "site_settings_navigation_order_idx" ON "site_settings_navigation" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "site_settings_navigation_parent_id_idx" ON "site_settings_navigation" USING btree ("_parent_id");
  DO $$ BEGIN ALTER TABLE "pages_blocks_hero_bento_cards" ADD CONSTRAINT "pages_blocks_hero_bento_cards_stat_background_image_id_media_id_fk" FOREIGN KEY ("stat_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_industries_fk" FOREIGN KEY ("industries_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_industries_fk" FOREIGN KEY ("industries_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_award_image_id_media_id_fk" FOREIGN KEY ("award_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
  CREATE INDEX IF NOT EXISTS "pages_blocks_hero_bento_cards_stat_background_image_idx" ON "pages_blocks_hero_bento_cards" USING btree ("stat_background_image_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_industries_id_idx" ON "pages_rels" USING btree ("industries_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_industries_id_idx" ON "payload_locked_documents_rels" USING btree ("industries_id");
  CREATE INDEX IF NOT EXISTS "site_settings_award_image_idx" ON "site_settings" USING btree ("award_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_page_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_industries_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_accordion_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_accordion" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_rich_text_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_text_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "industries" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_navigation" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_page_hero" CASCADE;
  DROP TABLE "pages_blocks_industries_grid" CASCADE;
  DROP TABLE "pages_blocks_accordion_items" CASCADE;
  DROP TABLE "pages_blocks_accordion" CASCADE;
  DROP TABLE "pages_blocks_rich_text_content" CASCADE;
  DROP TABLE "pages_blocks_text_block" CASCADE;
  DROP TABLE "industries" CASCADE;
  DROP TABLE "site_settings_navigation" CASCADE;
  ALTER TABLE "pages_blocks_hero_bento_cards" DROP CONSTRAINT "pages_blocks_hero_bento_cards_stat_background_image_id_media_id_fk";
  
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_industries_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_industries_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_award_image_id_media_id_fk";
  
  DROP INDEX "pages_blocks_hero_bento_cards_stat_background_image_idx";
  DROP INDEX "pages_rels_industries_id_idx";
  DROP INDEX "payload_locked_documents_rels_industries_id_idx";
  DROP INDEX "site_settings_award_image_idx";
  ALTER TABLE "pages_blocks_hero_bento_cards" DROP COLUMN "stat_background_image_id";
  ALTER TABLE "pages_blocks_service_grid" DROP COLUMN "settings_anchor_id";
  ALTER TABLE "pages_blocks_additional_services" DROP COLUMN "settings_anchor_id";
  ALTER TABLE "pages_blocks_testimonials" DROP COLUMN "settings_anchor_id";
  ALTER TABLE "pages_blocks_logo_ticker" DROP COLUMN "settings_anchor_id";
  ALTER TABLE "pages_blocks_content_side_by_side" DROP COLUMN "settings_anchor_id";
  ALTER TABLE "pages_blocks_content_side_by_side" DROP COLUMN "cta_link_type";
  ALTER TABLE "pages_blocks_content_side_by_side" DROP COLUMN "cta_anchor";
  ALTER TABLE "pages_blocks_video_block" DROP COLUMN "settings_anchor_id";
  ALTER TABLE "pages_blocks_contact_form" DROP COLUMN "settings_anchor_id";
  ALTER TABLE "pages_rels" DROP COLUMN "industries_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "industries_id";
  ALTER TABLE "site_settings" DROP COLUMN "award_enabled";
  ALTER TABLE "site_settings" DROP COLUMN "award_image_id";
  ALTER TABLE "site_settings" DROP COLUMN "award_title";
  ALTER TABLE "site_settings" DROP COLUMN "award_description";
  ALTER TABLE "site_settings" DROP COLUMN "cta_type";
  ALTER TABLE "site_settings" DROP COLUMN "cta_text";
  ALTER TABLE "site_settings" DROP COLUMN "cta_link";
  ALTER TABLE "site_settings" DROP COLUMN "cta_phone";
  DROP TYPE "public"."enum_pages_blocks_service_grid_settings_anchor_id";
  DROP TYPE "public"."enum_pages_blocks_additional_services_settings_anchor_id";
  DROP TYPE "public"."enum_pages_blocks_industries_grid_settings_theme";
  DROP TYPE "public"."enum_pages_blocks_industries_grid_settings_anchor_id";
  DROP TYPE "public"."enum_pages_blocks_testimonials_settings_anchor_id";
  DROP TYPE "public"."enum_pages_blocks_logo_ticker_settings_anchor_id";
  DROP TYPE "public"."enum_pages_blocks_content_side_by_side_settings_anchor_id";
  DROP TYPE "public"."enum_pages_blocks_content_side_by_side_cta_link_type";
  DROP TYPE "public"."enum_pages_blocks_content_side_by_side_cta_anchor";
  DROP TYPE "public"."enum_pages_blocks_video_block_settings_anchor_id";
  DROP TYPE "public"."enum_pages_blocks_contact_form_settings_anchor_id";
  DROP TYPE "public"."enum_pages_blocks_accordion_settings_theme";
  DROP TYPE "public"."enum_pages_blocks_accordion_settings_anchor_id";
  DROP TYPE "public"."enum_pages_blocks_rich_text_content_settings_theme";
  DROP TYPE "public"."enum_pages_blocks_rich_text_content_settings_anchor_id";
  DROP TYPE "public"."enum_pages_blocks_text_block_settings_theme";
  DROP TYPE "public"."enum_pages_blocks_text_block_settings_anchor_id";
  DROP TYPE "public"."enum_industries_selected_icon";
  DROP TYPE "public"."enum_site_settings_navigation_link_type";
  DROP TYPE "public"."enum_site_settings_navigation_anchor_link";
  DROP TYPE "public"."enum_site_settings_cta_type";`)
}
