import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" ADD COLUMN "imprint_link" varchar DEFAULT '/impressum';
  ALTER TABLE "site_settings" ADD COLUMN "privacy_link" varchar DEFAULT '/datenschutz';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" DROP COLUMN "imprint_link";
  ALTER TABLE "site_settings" DROP COLUMN "privacy_link";`)
}
