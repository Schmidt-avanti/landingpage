import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_bento_cards_card_type" AS ENUM('image', 'screenshot', 'stat', 'decorative');
  CREATE TYPE "public"."enum_pages_blocks_hero_bento_cards_card_size" AS ENUM('small', 'medium', 'large');
  CREATE TYPE "public"."enum_pages_blocks_service_grid_settings_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_additional_services_settings_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_settings_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_logo_ticker_settings_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_logo_ticker_speed" AS ENUM('slow', 'normal', 'fast');
  CREATE TYPE "public"."enum_pages_blocks_content_side_by_side_settings_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_content_side_by_side_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_video_block_settings_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_contact_form_settings_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_services_type" AS ENUM('main', 'additional');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "pages_blocks_hero_bento_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"card_type" "enum_pages_blocks_hero_bento_cards_card_type" DEFAULT 'image' NOT NULL,
  	"card_size" "enum_pages_blocks_hero_bento_cards_card_size" DEFAULT 'small',
  	"image_id" integer,
  	"stat_value" varchar,
  	"stat_label" varchar,
  	"card_title" varchar
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar NOT NULL,
  	"badge_text" varchar,
  	"subheadline" varchar,
  	"cta_text" varchar,
  	"cta_link" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_service_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_theme" "enum_pages_blocks_service_grid_settings_theme" DEFAULT 'light',
  	"title" varchar DEFAULT 'Unsere Leistungen' NOT NULL,
  	"introduction" varchar DEFAULT 'Maßgeschneiderte Lösungen für Ihren Kundenservice – skalierbar, professionell und persönlich.' NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_additional_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_theme" "enum_pages_blocks_additional_services_settings_theme" DEFAULT 'light',
  	"headline" varchar DEFAULT 'Weitere Serviceleistungen' NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_theme" "enum_pages_blocks_testimonials_settings_theme" DEFAULT 'light',
  	"title" varchar DEFAULT 'Ergebnisse, die für sich sprechen',
  	"subtitle" varchar DEFAULT 'Kundenstimmen',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_logo_ticker_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "pages_blocks_logo_ticker" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_theme" "enum_pages_blocks_logo_ticker_settings_theme" DEFAULT 'light',
  	"headline" varchar DEFAULT 'Vertrauen von führenden Unternehmen',
  	"speed" "enum_pages_blocks_logo_ticker_speed" DEFAULT 'normal',
  	"invert_logos" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_content_side_by_side_additional_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_blocks_content_side_by_side" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_theme" "enum_pages_blocks_content_side_by_side_settings_theme" DEFAULT 'light',
  	"headline" varchar,
  	"subheadline" varchar,
  	"content" jsonb NOT NULL,
  	"image_id" integer NOT NULL,
  	"image_position" "enum_pages_blocks_content_side_by_side_image_position" DEFAULT 'right',
  	"cta_text" varchar,
  	"cta_link" varchar,
  	"quote_text" varchar,
  	"author_name" varchar,
  	"author_role" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_video_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_theme" "enum_pages_blocks_video_block_settings_theme" DEFAULT 'light',
  	"headline" varchar,
  	"subheadline" varchar,
  	"video_file_id" integer NOT NULL,
  	"thumbnail_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar DEFAULT 'Jetzt kostenloses Angebot anfordern',
  	"subheadline" varchar DEFAULT 'avanti kennenlernen',
  	"intro_text" varchar,
  	"phone_number" varchar DEFAULT '+49 (0)30 / 814 892-121',
  	"card_headline" varchar DEFAULT 'Ja, ich interessiere mich für ein kostenloses Angebot.',
  	"button_text" varchar DEFAULT 'Angebot anfordern',
  	"privacy_text" varchar DEFAULT 'Ich akzeptiere die Datenschutzerklärung',
  	"footer_text" varchar DEFAULT 'Wir behandeln Ihre Daten vertraulich.',
  	"email_to" varchar DEFAULT 'info@avanti.cx',
  	"settings_theme" "enum_pages_blocks_contact_form_settings_theme" DEFAULT 'light',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon_id" integer,
  	"selected_icon" varchar,
  	"type" "enum_services_type" DEFAULT 'main',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"company" varchar,
  	"role" varchar,
  	"quote" varchar NOT NULL,
  	"avatar_id" integer,
  	"rating" numeric DEFAULT 5,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"message" varchar,
  	"source" varchar,
  	"company" varchar,
  	"position" varchar,
  	"phone" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"pages_id" integer,
  	"services_id" integer,
  	"testimonials_id" integer,
  	"form_submissions_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer NOT NULL,
  	"footer_logo_id" integer,
  	"phone_number" varchar,
  	"email" varchar,
  	"footer_text" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_bento_cards" ADD CONSTRAINT "pages_blocks_hero_bento_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_bento_cards" ADD CONSTRAINT "pages_blocks_hero_bento_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_grid" ADD CONSTRAINT "pages_blocks_service_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_additional_services" ADD CONSTRAINT "pages_blocks_additional_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_ticker_logos" ADD CONSTRAINT "pages_blocks_logo_ticker_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_ticker_logos" ADD CONSTRAINT "pages_blocks_logo_ticker_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_logo_ticker"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_ticker" ADD CONSTRAINT "pages_blocks_logo_ticker_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_side_by_side_additional_images" ADD CONSTRAINT "pages_blocks_content_side_by_side_additional_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_side_by_side_additional_images" ADD CONSTRAINT "pages_blocks_content_side_by_side_additional_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content_side_by_side"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_side_by_side" ADD CONSTRAINT "pages_blocks_content_side_by_side_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_side_by_side" ADD CONSTRAINT "pages_blocks_content_side_by_side_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_block" ADD CONSTRAINT "pages_blocks_video_block_video_file_id_media_id_fk" FOREIGN KEY ("video_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_block" ADD CONSTRAINT "pages_blocks_video_block_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_block" ADD CONSTRAINT "pages_blocks_video_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form" ADD CONSTRAINT "pages_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_footer_logo_id_media_id_fk" FOREIGN KEY ("footer_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "pages_blocks_hero_bento_cards_order_idx" ON "pages_blocks_hero_bento_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_bento_cards_parent_id_idx" ON "pages_blocks_hero_bento_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_bento_cards_image_idx" ON "pages_blocks_hero_bento_cards" USING btree ("image_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_service_grid_order_idx" ON "pages_blocks_service_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_grid_parent_id_idx" ON "pages_blocks_service_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_grid_path_idx" ON "pages_blocks_service_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_additional_services_order_idx" ON "pages_blocks_additional_services" USING btree ("_order");
  CREATE INDEX "pages_blocks_additional_services_parent_id_idx" ON "pages_blocks_additional_services" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_additional_services_path_idx" ON "pages_blocks_additional_services" USING btree ("_path");
  CREATE INDEX "pages_blocks_testimonials_order_idx" ON "pages_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_parent_id_idx" ON "pages_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_path_idx" ON "pages_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "pages_blocks_logo_ticker_logos_order_idx" ON "pages_blocks_logo_ticker_logos" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_ticker_logos_parent_id_idx" ON "pages_blocks_logo_ticker_logos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_ticker_logos_logo_idx" ON "pages_blocks_logo_ticker_logos" USING btree ("logo_id");
  CREATE INDEX "pages_blocks_logo_ticker_order_idx" ON "pages_blocks_logo_ticker" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_ticker_parent_id_idx" ON "pages_blocks_logo_ticker" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_ticker_path_idx" ON "pages_blocks_logo_ticker" USING btree ("_path");
  CREATE INDEX "pages_blocks_content_side_by_side_additional_images_order_idx" ON "pages_blocks_content_side_by_side_additional_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_side_by_side_additional_images_parent_id_idx" ON "pages_blocks_content_side_by_side_additional_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_side_by_side_additional_images_imag_idx" ON "pages_blocks_content_side_by_side_additional_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_content_side_by_side_order_idx" ON "pages_blocks_content_side_by_side" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_side_by_side_parent_id_idx" ON "pages_blocks_content_side_by_side" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_side_by_side_path_idx" ON "pages_blocks_content_side_by_side" USING btree ("_path");
  CREATE INDEX "pages_blocks_content_side_by_side_image_idx" ON "pages_blocks_content_side_by_side" USING btree ("image_id");
  CREATE INDEX "pages_blocks_video_block_order_idx" ON "pages_blocks_video_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_video_block_parent_id_idx" ON "pages_blocks_video_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_block_path_idx" ON "pages_blocks_video_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_video_block_video_file_idx" ON "pages_blocks_video_block" USING btree ("video_file_id");
  CREATE INDEX "pages_blocks_video_block_thumbnail_idx" ON "pages_blocks_video_block" USING btree ("thumbnail_id");
  CREATE INDEX "pages_blocks_contact_form_order_idx" ON "pages_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_parent_id_idx" ON "pages_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_path_idx" ON "pages_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_services_id_idx" ON "pages_rels" USING btree ("services_id");
  CREATE INDEX "services_icon_idx" ON "services" USING btree ("icon_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "testimonials_avatar_idx" ON "testimonials" USING btree ("avatar_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "site_settings_footer_logo_idx" ON "site_settings" USING btree ("footer_logo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "pages_blocks_hero_bento_cards" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_service_grid" CASCADE;
  DROP TABLE "pages_blocks_additional_services" CASCADE;
  DROP TABLE "pages_blocks_testimonials" CASCADE;
  DROP TABLE "pages_blocks_logo_ticker_logos" CASCADE;
  DROP TABLE "pages_blocks_logo_ticker" CASCADE;
  DROP TABLE "pages_blocks_content_side_by_side_additional_images" CASCADE;
  DROP TABLE "pages_blocks_content_side_by_side" CASCADE;
  DROP TABLE "pages_blocks_video_block" CASCADE;
  DROP TABLE "pages_blocks_contact_form" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_hero_bento_cards_card_type";
  DROP TYPE "public"."enum_pages_blocks_hero_bento_cards_card_size";
  DROP TYPE "public"."enum_pages_blocks_service_grid_settings_theme";
  DROP TYPE "public"."enum_pages_blocks_additional_services_settings_theme";
  DROP TYPE "public"."enum_pages_blocks_testimonials_settings_theme";
  DROP TYPE "public"."enum_pages_blocks_logo_ticker_settings_theme";
  DROP TYPE "public"."enum_pages_blocks_logo_ticker_speed";
  DROP TYPE "public"."enum_pages_blocks_content_side_by_side_settings_theme";
  DROP TYPE "public"."enum_pages_blocks_content_side_by_side_image_position";
  DROP TYPE "public"."enum_pages_blocks_video_block_settings_theme";
  DROP TYPE "public"."enum_pages_blocks_contact_form_settings_theme";
  DROP TYPE "public"."enum_services_type";`)
}
