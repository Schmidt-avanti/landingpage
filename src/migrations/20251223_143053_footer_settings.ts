import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "site_settings_legal_documents" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"file_id" integer NOT NULL
  );
  
  ALTER TABLE "site_settings" ADD COLUMN "social_instagram" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "social_linkedin" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "company_name" varchar DEFAULT 'Avanti CX GmbH';
  ALTER TABLE "site_settings" ADD COLUMN "company_address" varchar;
  ALTER TABLE "site_settings_legal_documents" ADD CONSTRAINT "site_settings_legal_documents_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_legal_documents" ADD CONSTRAINT "site_settings_legal_documents_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "site_settings_legal_documents_order_idx" ON "site_settings_legal_documents" USING btree ("_order");
  CREATE INDEX "site_settings_legal_documents_parent_id_idx" ON "site_settings_legal_documents" USING btree ("_parent_id");
  CREATE INDEX "site_settings_legal_documents_file_idx" ON "site_settings_legal_documents" USING btree ("file_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "site_settings_legal_documents" CASCADE;
  ALTER TABLE "site_settings" DROP COLUMN "social_instagram";
  ALTER TABLE "site_settings" DROP COLUMN "social_linkedin";
  ALTER TABLE "site_settings" DROP COLUMN "company_name";
  ALTER TABLE "site_settings" DROP COLUMN "company_address";`)
}
