import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_industries_benefits_icon" ADD VALUE 'PhoneCall' BEFORE 'Users';
  ALTER TYPE "public"."enum_industries_benefits_icon" ADD VALUE 'Wrench' BEFORE 'Users';
  ALTER TYPE "public"."enum_industries_benefits_icon" ADD VALUE 'UserCheck' BEFORE 'Users';
  ALTER TYPE "public"."enum_industries_benefits_icon" ADD VALUE 'TrendingUp' BEFORE 'Users';
  ALTER TYPE "public"."enum_industries_benefits_icon" ADD VALUE 'RefreshCw' BEFORE 'Users';
  ALTER TYPE "public"."enum_industries_benefits_icon" ADD VALUE 'CreditCard' BEFORE 'Users';
  ALTER TYPE "public"."enum_industries_benefits_icon" ADD VALUE 'Gauge' BEFORE 'Users';
  ALTER TYPE "public"."enum_industries_benefits_icon" ADD VALUE 'Filter' BEFORE 'Users';
  ALTER TYPE "public"."enum_industries_benefits_icon" ADD VALUE 'ClipboardList' BEFORE 'Users';
  ALTER TYPE "public"."enum_industries_benefits_icon" ADD VALUE 'Database' BEFORE 'Users';
  ALTER TYPE "public"."enum_industries_benefits_icon" ADD VALUE 'PhoneForwarded' BEFORE 'Users';
  ALTER TYPE "public"."enum_industries_benefits_icon" ADD VALUE 'Smile' BEFORE 'Users';
  ALTER TYPE "public"."enum_industries_selected_icon" ADD VALUE 'PhoneCall';
  ALTER TYPE "public"."enum_industries_selected_icon" ADD VALUE 'Wrench';
  ALTER TYPE "public"."enum_industries_selected_icon" ADD VALUE 'UserCheck';
  ALTER TYPE "public"."enum_industries_selected_icon" ADD VALUE 'TrendingUp';
  ALTER TYPE "public"."enum_industries_selected_icon" ADD VALUE 'RefreshCw';
  ALTER TYPE "public"."enum_industries_selected_icon" ADD VALUE 'CreditCard';
  ALTER TYPE "public"."enum_industries_selected_icon" ADD VALUE 'Users';
  ALTER TYPE "public"."enum_industries_selected_icon" ADD VALUE 'Gauge';
  ALTER TYPE "public"."enum_industries_selected_icon" ADD VALUE 'Filter';
  ALTER TYPE "public"."enum_industries_selected_icon" ADD VALUE 'ClipboardList';
  ALTER TYPE "public"."enum_industries_selected_icon" ADD VALUE 'MessageSquare';
  ALTER TYPE "public"."enum_industries_selected_icon" ADD VALUE 'Database';
  ALTER TYPE "public"."enum_industries_selected_icon" ADD VALUE 'PhoneForwarded';
  ALTER TYPE "public"."enum_industries_selected_icon" ADD VALUE 'Smile';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "industries_benefits" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum_industries_benefits_icon";
  CREATE TYPE "public"."enum_industries_benefits_icon" AS ENUM('Check', 'Star', 'Zap', 'Shield', 'Phone', 'MessageSquare', 'Calendar', 'Clock', 'Users', 'Headset');
  ALTER TABLE "industries_benefits" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_industries_benefits_icon" USING "icon"::"public"."enum_industries_benefits_icon";
  ALTER TABLE "industries" ALTER COLUMN "selected_icon" SET DATA TYPE text;
  DROP TYPE "public"."enum_industries_selected_icon";
  CREATE TYPE "public"."enum_industries_selected_icon" AS ENUM('Home', 'ShoppingCart', 'Car', 'Store', 'Heart', 'Stethoscope', 'Scale', 'Utensils', 'Hammer', 'Building2', 'Armchair', 'Shield', 'Hotel', 'Building', 'Factory', 'Package', 'Briefcase', 'GraduationCap');
  ALTER TABLE "industries" ALTER COLUMN "selected_icon" SET DATA TYPE "public"."enum_industries_selected_icon" USING "selected_icon"::"public"."enum_industries_selected_icon";`)
}
