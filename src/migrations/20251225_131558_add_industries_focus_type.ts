import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // First, create types and tables
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_focus_industries_grid_settings_theme" AS ENUM('dark', 'light');
  CREATE TYPE "public"."enum_pages_blocks_additional_industries_settings_theme" AS ENUM('dark', 'light');
  CREATE TYPE "public"."enum_industries_benefits_icon" AS ENUM('Check', 'Star', 'Zap', 'Shield', 'Phone', 'MessageSquare', 'Calendar', 'Clock', 'Users', 'Headset');
  CREATE TYPE "public"."enum_industries_type" AS ENUM('focus', 'additional');
  CREATE TABLE "pages_blocks_focus_industries_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tagline" varchar,
  	"headline" varchar DEFAULT 'Unsere Fokus-Branchen',
  	"introduction" varchar,
  	"settings_theme" "enum_pages_blocks_focus_industries_grid_settings_theme" DEFAULT 'dark',
  	"settings_show_link" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_additional_industries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar DEFAULT 'Weitere Branchen',
  	"settings_theme" "enum_pages_blocks_additional_industries_settings_theme" DEFAULT 'dark',
  	"block_name" varchar
  );
  
  CREATE TABLE "industries_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"icon" "enum_industries_benefits_icon"
  );
  
  -- Add slug column as nullable first
  ALTER TABLE "industries" ADD COLUMN "slug" varchar;
  ALTER TABLE "industries" ADD COLUMN "type" "enum_industries_type" DEFAULT 'additional' NOT NULL;
  ALTER TABLE "industries" ADD COLUMN "featured_image_id" integer;
  ALTER TABLE "industries" ADD COLUMN "content" jsonb;
  ALTER TABLE "industries" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "industries" ADD COLUMN "meta_description" varchar;
  
  ALTER TABLE "pages_blocks_focus_industries_grid" ADD CONSTRAINT "pages_blocks_focus_industries_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_additional_industries" ADD CONSTRAINT "pages_blocks_additional_industries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "industries_benefits" ADD CONSTRAINT "industries_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_focus_industries_grid_order_idx" ON "pages_blocks_focus_industries_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_focus_industries_grid_parent_id_idx" ON "pages_blocks_focus_industries_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_focus_industries_grid_path_idx" ON "pages_blocks_focus_industries_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_additional_industries_order_idx" ON "pages_blocks_additional_industries" USING btree ("_order");
  CREATE INDEX "pages_blocks_additional_industries_parent_id_idx" ON "pages_blocks_additional_industries" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_additional_industries_path_idx" ON "pages_blocks_additional_industries" USING btree ("_path");
  CREATE INDEX "industries_benefits_order_idx" ON "industries_benefits" USING btree ("_order");
  CREATE INDEX "industries_benefits_parent_id_idx" ON "industries_benefits" USING btree ("_parent_id");
  ALTER TABLE "industries" ADD CONSTRAINT "industries_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "industries_featured_image_idx" ON "industries" USING btree ("featured_image_id");`)

  // Generate slugs from titles for existing industries
  await db.execute(sql`
    UPDATE "industries" 
    SET "slug" = LOWER(
      REGEXP_REPLACE(
        REGEXP_REPLACE(
          REGEXP_REPLACE(
            REPLACE(REPLACE(REPLACE(REPLACE(REPLACE("title", 'ä', 'ae'), 'ö', 'oe'), 'ü', 'ue'), 'ß', 'ss'), ' ', '-'),
            '[^a-z0-9-]', '', 'g'
          ),
          '-+', '-', 'g'
        ),
        '^-|-$', '', 'g'
      )
    )
    WHERE "slug" IS NULL;
  `)

  // Now add NOT NULL constraint and unique index
  await db.execute(sql`
    ALTER TABLE "industries" ALTER COLUMN "slug" SET NOT NULL;
    CREATE UNIQUE INDEX "industries_slug_idx" ON "industries" USING btree ("slug");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_focus_industries_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_additional_industries" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "industries_benefits" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_focus_industries_grid" CASCADE;
  DROP TABLE "pages_blocks_additional_industries" CASCADE;
  DROP TABLE "industries_benefits" CASCADE;
  ALTER TABLE "industries" DROP CONSTRAINT "industries_featured_image_id_media_id_fk";
  
  DROP INDEX "industries_slug_idx";
  DROP INDEX "industries_featured_image_idx";
  ALTER TABLE "industries" DROP COLUMN "slug";
  ALTER TABLE "industries" DROP COLUMN "type";
  ALTER TABLE "industries" DROP COLUMN "featured_image_id";
  ALTER TABLE "industries" DROP COLUMN "content";
  ALTER TABLE "industries" DROP COLUMN "meta_title";
  ALTER TABLE "industries" DROP COLUMN "meta_description";
  DROP TYPE "public"."enum_pages_blocks_focus_industries_grid_settings_theme";
  DROP TYPE "public"."enum_pages_blocks_additional_industries_settings_theme";
  DROP TYPE "public"."enum_industries_benefits_icon";
  DROP TYPE "public"."enum_industries_type";`)
}
