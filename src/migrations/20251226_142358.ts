import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_stats_showcase_stats_display_type" AS ENUM('value', 'chart');
  ALTER TABLE "pages_blocks_stats_showcase_stats" ADD COLUMN "display_type" "enum_pages_blocks_stats_showcase_stats_display_type" DEFAULT 'value';
  ALTER TABLE "pages_blocks_stats_showcase_stats" ADD COLUMN "start_value" numeric;
  ALTER TABLE "pages_blocks_stats_showcase_stats" ADD COLUMN "chart_periods" numeric DEFAULT 6;
  ALTER TABLE "pages_blocks_stats_showcase_stats" ADD COLUMN "chart_period_label" varchar DEFAULT 'Monate';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_stats_showcase_stats" DROP COLUMN "display_type";
  ALTER TABLE "pages_blocks_stats_showcase_stats" DROP COLUMN "start_value";
  ALTER TABLE "pages_blocks_stats_showcase_stats" DROP COLUMN "chart_periods";
  ALTER TABLE "pages_blocks_stats_showcase_stats" DROP COLUMN "chart_period_label";
  DROP TYPE "public"."enum_pages_blocks_stats_showcase_stats_display_type";`)
}
