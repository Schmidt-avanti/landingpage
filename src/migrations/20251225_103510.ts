import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero_bento_cards" ADD COLUMN "card_headline" varchar;
  ALTER TABLE "pages_blocks_hero_bento_cards" ADD COLUMN "card_subheadline" varchar;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "secondary_cta_text" varchar;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "secondary_cta_link" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero_bento_cards" DROP COLUMN "card_headline";
  ALTER TABLE "pages_blocks_hero_bento_cards" DROP COLUMN "card_subheadline";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "secondary_cta_text";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "secondary_cta_link";`)
}
