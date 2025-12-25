import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_process_steps_steps_icon" AS ENUM('Calendar', 'Settings', 'ClipboardList', 'Rocket', 'RefreshCw', 'CheckCircle', 'Users', 'Phone', 'MessageSquare', 'Mail', 'Target', 'TrendingUp');
  CREATE TYPE "public"."enum_pages_blocks_process_steps_settings_layout" AS ENUM('timeline', 'cards');
  CREATE TYPE "public"."enum_pages_blocks_flywheel_diagram_phases_icon" AS ENUM('HelpCircle', 'ClipboardCheck', 'Mail', 'PlusCircle', 'RefreshCw', 'TrendingUp');
  CREATE TYPE "public"."enum_pages_blocks_stats_showcase_stats_icon" AS ENUM('CheckCircle', 'TrendingUp', 'Phone', 'Clock', 'Users', 'Star', 'Target', 'MessageSquare');
  CREATE TYPE "public"."enum_pages_blocks_stats_showcase_settings_layout" AS ENUM('grid', 'row');
  CREATE TABLE "pages_blocks_process_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"icon" "enum_pages_blocks_process_steps_steps_icon"
  );
  
  CREATE TABLE "pages_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tagline" varchar,
  	"headline" varchar DEFAULT 'So starten Sie mit Avanti',
  	"introduction" varchar,
  	"settings_layout" "enum_pages_blocks_process_steps_settings_layout" DEFAULT 'timeline',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_flywheel_diagram_phases" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"icon" "enum_pages_blocks_flywheel_diagram_phases_icon"
  );
  
  CREATE TABLE "pages_blocks_flywheel_diagram" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tagline" varchar,
  	"headline" varchar DEFAULT 'Das Schwungrad-Prinzip',
  	"introduction" varchar DEFAULT 'Mit jedem Kundenkontakt wird Ihr Service besser – automatisch und kontinuierlich.',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_showcase_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" numeric NOT NULL,
  	"prefix" varchar,
  	"suffix" varchar,
  	"label" varchar NOT NULL,
  	"description" varchar,
  	"icon" "enum_pages_blocks_stats_showcase_stats_icon"
  );
  
  CREATE TABLE "pages_blocks_stats_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tagline" varchar,
  	"headline" varchar DEFAULT 'Messbare Ergebnisse',
  	"introduction" varchar,
  	"settings_layout" "enum_pages_blocks_stats_showcase_settings_layout" DEFAULT 'grid',
  	"settings_animate_on_scroll" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_process_steps_steps" ADD CONSTRAINT "pages_blocks_process_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_steps" ADD CONSTRAINT "pages_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_flywheel_diagram_phases" ADD CONSTRAINT "pages_blocks_flywheel_diagram_phases_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_flywheel_diagram"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_flywheel_diagram" ADD CONSTRAINT "pages_blocks_flywheel_diagram_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_showcase_stats" ADD CONSTRAINT "pages_blocks_stats_showcase_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_showcase" ADD CONSTRAINT "pages_blocks_stats_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_process_steps_steps_order_idx" ON "pages_blocks_process_steps_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_steps_steps_parent_id_idx" ON "pages_blocks_process_steps_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_steps_order_idx" ON "pages_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_steps_parent_id_idx" ON "pages_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_steps_path_idx" ON "pages_blocks_process_steps" USING btree ("_path");
  CREATE INDEX "pages_blocks_flywheel_diagram_phases_order_idx" ON "pages_blocks_flywheel_diagram_phases" USING btree ("_order");
  CREATE INDEX "pages_blocks_flywheel_diagram_phases_parent_id_idx" ON "pages_blocks_flywheel_diagram_phases" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_flywheel_diagram_order_idx" ON "pages_blocks_flywheel_diagram" USING btree ("_order");
  CREATE INDEX "pages_blocks_flywheel_diagram_parent_id_idx" ON "pages_blocks_flywheel_diagram" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_flywheel_diagram_path_idx" ON "pages_blocks_flywheel_diagram" USING btree ("_path");
  CREATE INDEX "pages_blocks_stats_showcase_stats_order_idx" ON "pages_blocks_stats_showcase_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_showcase_stats_parent_id_idx" ON "pages_blocks_stats_showcase_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_showcase_order_idx" ON "pages_blocks_stats_showcase" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_showcase_parent_id_idx" ON "pages_blocks_stats_showcase" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_showcase_path_idx" ON "pages_blocks_stats_showcase" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_process_steps_steps" CASCADE;
  DROP TABLE "pages_blocks_process_steps" CASCADE;
  DROP TABLE "pages_blocks_flywheel_diagram_phases" CASCADE;
  DROP TABLE "pages_blocks_flywheel_diagram" CASCADE;
  DROP TABLE "pages_blocks_stats_showcase_stats" CASCADE;
  DROP TABLE "pages_blocks_stats_showcase" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_process_steps_steps_icon";
  DROP TYPE "public"."enum_pages_blocks_process_steps_settings_layout";
  DROP TYPE "public"."enum_pages_blocks_flywheel_diagram_phases_icon";
  DROP TYPE "public"."enum_pages_blocks_stats_showcase_stats_icon";
  DROP TYPE "public"."enum_pages_blocks_stats_showcase_settings_layout";`)
}
