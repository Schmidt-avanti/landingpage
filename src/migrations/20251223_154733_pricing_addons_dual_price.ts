import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_pricing_addons_addons" ADD COLUMN "onetime_price" varchar;
  ALTER TABLE "pages_blocks_pricing_addons_addons" ADD COLUMN "monthly_price" varchar;
  ALTER TABLE "pages_blocks_pricing_addons_addons" DROP COLUMN "price_type";
  ALTER TABLE "pages_blocks_pricing_addons_addons" DROP COLUMN "price";
  DROP TYPE "public"."enum_pages_blocks_pricing_addons_addons_price_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_pricing_addons_addons_price_type" AS ENUM('monthly', 'onetime');
  ALTER TABLE "pages_blocks_pricing_addons_addons" ADD COLUMN "price_type" "enum_pages_blocks_pricing_addons_addons_price_type" DEFAULT 'monthly';
  ALTER TABLE "pages_blocks_pricing_addons_addons" ADD COLUMN "price" varchar;
  ALTER TABLE "pages_blocks_pricing_addons_addons" DROP COLUMN "onetime_price";
  ALTER TABLE "pages_blocks_pricing_addons_addons" DROP COLUMN "monthly_price";`)
}
