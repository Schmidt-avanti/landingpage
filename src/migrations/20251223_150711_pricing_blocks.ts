import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_pricing_grid_settings_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_pricing_grid_settings_anchor_id" AS ENUM('contact-form', 'services', 'testimonials', 'video', 'industries', 'suite');
  CREATE TYPE "public"."enum_pages_blocks_pricing_addons_settings_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_pricing_addons_settings_anchor_id" AS ENUM('contact-form', 'services', 'testimonials', 'video', 'industries', 'suite');
  CREATE TABLE "pages_blocks_pricing_grid_packages" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"is_recommended" boolean DEFAULT false,
  	"opening_hours" varchar NOT NULL,
  	"price" varchar,
  	"price_note" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_grid_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pricing_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_theme" "enum_pages_blocks_pricing_grid_settings_theme" DEFAULT 'light',
  	"settings_anchor_id" "enum_pages_blocks_pricing_grid_settings_anchor_id",
  	"headline" varchar DEFAULT 'Service-Pakete',
  	"subheadline" varchar,
  	"onboarding_enabled" boolean DEFAULT true,
  	"onboarding_label" varchar DEFAULT 'Einmalige Onboarding-Gebühr',
  	"onboarding_price" varchar DEFAULT '2.450€',
  	"features_headline" varchar DEFAULT 'Alle Pakete enthalten:',
  	"cta_text" varchar DEFAULT 'Demo buchen →',
  	"cta_link" varchar DEFAULT '/#kontakt',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_addons_addons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"price" varchar,
  	"note" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_addons_footnotes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pricing_addons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_theme" "enum_pages_blocks_pricing_addons_settings_theme" DEFAULT 'light',
  	"settings_anchor_id" "enum_pages_blocks_pricing_addons_settings_anchor_id",
  	"headline" varchar DEFAULT 'Zusatz-Optionen',
  	"subheadline" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_pricing_grid_packages" ADD CONSTRAINT "pages_blocks_pricing_grid_packages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_grid_features" ADD CONSTRAINT "pages_blocks_pricing_grid_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_grid" ADD CONSTRAINT "pages_blocks_pricing_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_addons_addons" ADD CONSTRAINT "pages_blocks_pricing_addons_addons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_addons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_addons_footnotes" ADD CONSTRAINT "pages_blocks_pricing_addons_footnotes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_addons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_addons" ADD CONSTRAINT "pages_blocks_pricing_addons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_pricing_grid_packages_order_idx" ON "pages_blocks_pricing_grid_packages" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_grid_packages_parent_id_idx" ON "pages_blocks_pricing_grid_packages" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_grid_features_order_idx" ON "pages_blocks_pricing_grid_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_grid_features_parent_id_idx" ON "pages_blocks_pricing_grid_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_grid_order_idx" ON "pages_blocks_pricing_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_grid_parent_id_idx" ON "pages_blocks_pricing_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_grid_path_idx" ON "pages_blocks_pricing_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_pricing_addons_addons_order_idx" ON "pages_blocks_pricing_addons_addons" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_addons_addons_parent_id_idx" ON "pages_blocks_pricing_addons_addons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_addons_footnotes_order_idx" ON "pages_blocks_pricing_addons_footnotes" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_addons_footnotes_parent_id_idx" ON "pages_blocks_pricing_addons_footnotes" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_addons_order_idx" ON "pages_blocks_pricing_addons" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_addons_parent_id_idx" ON "pages_blocks_pricing_addons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_addons_path_idx" ON "pages_blocks_pricing_addons" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_pricing_grid_packages" CASCADE;
  DROP TABLE "pages_blocks_pricing_grid_features" CASCADE;
  DROP TABLE "pages_blocks_pricing_grid" CASCADE;
  DROP TABLE "pages_blocks_pricing_addons_addons" CASCADE;
  DROP TABLE "pages_blocks_pricing_addons_footnotes" CASCADE;
  DROP TABLE "pages_blocks_pricing_addons" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_pricing_grid_settings_theme";
  DROP TYPE "public"."enum_pages_blocks_pricing_grid_settings_anchor_id";
  DROP TYPE "public"."enum_pages_blocks_pricing_addons_settings_theme";
  DROP TYPE "public"."enum_pages_blocks_pricing_addons_settings_anchor_id";`)
}
