import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_pricing_addons_addons_price_type" AS ENUM('monthly', 'onetime');
  ALTER TABLE "pages_blocks_pricing_addons_addons" ADD COLUMN "price_type" "enum_pages_blocks_pricing_addons_addons_price_type" DEFAULT 'monthly';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_pricing_addons_addons" DROP COLUMN "price_type";
  DROP TYPE "public"."enum_pages_blocks_pricing_addons_addons_price_type";`)
}
