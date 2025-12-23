import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_cta_link_type" AS ENUM('page', 'anchor');
  CREATE TYPE "public"."enum_pages_blocks_hero_cta_anchor" AS ENUM('contact-form', 'services', 'testimonials', 'video', 'industries', 'suite');
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "cta_link_type" "enum_pages_blocks_hero_cta_link_type" DEFAULT 'anchor';
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "cta_anchor" "enum_pages_blocks_hero_cta_anchor";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero" DROP COLUMN "cta_link_type";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "cta_anchor";
  DROP TYPE "public"."enum_pages_blocks_hero_cta_link_type";
  DROP TYPE "public"."enum_pages_blocks_hero_cta_anchor";`)
}
