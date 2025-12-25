import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_accordion" ADD COLUMN "tagline" varchar;
  ALTER TABLE "pages_blocks_accordion" ADD COLUMN "headline" varchar;
  ALTER TABLE "pages_blocks_accordion" ADD COLUMN "introduction" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_accordion" DROP COLUMN "tagline";
  ALTER TABLE "pages_blocks_accordion" DROP COLUMN "headline";
  ALTER TABLE "pages_blocks_accordion" DROP COLUMN "introduction";`)
}
