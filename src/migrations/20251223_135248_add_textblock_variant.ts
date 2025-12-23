import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_text_block_variant" AS ENUM('hint', 'standard', 'page');
  ALTER TABLE "pages_blocks_text_block" ADD COLUMN "variant" "enum_pages_blocks_text_block_variant" DEFAULT 'standard';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_text_block" DROP COLUMN "variant";
  DROP TYPE "public"."enum_pages_blocks_text_block_variant";`)
}
