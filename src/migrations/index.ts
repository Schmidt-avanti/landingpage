import * as migration_20251222_173001 from './20251222_173001';
import * as migration_20251223_121910 from './20251223_121910';
import * as migration_20251223_135248_add_textblock_variant from './20251223_135248_add_textblock_variant';
import * as migration_20251223_143053_footer_settings from './20251223_143053_footer_settings';
import * as migration_20251223_144551_legal_page_links from './20251223_144551_legal_page_links';
import * as migration_20251223_150711_pricing_blocks from './20251223_150711_pricing_blocks';
import * as migration_20251223_152914_pricing_cta_linktype from './20251223_152914_pricing_cta_linktype';
import * as migration_20251223_153902_pricing_addons_pricetype from './20251223_153902_pricing_addons_pricetype';
import * as migration_20251223_154733_pricing_addons_dual_price from './20251223_154733_pricing_addons_dual_price';
import * as migration_20251223_155805_hero_cta_linktype from './20251223_155805_hero_cta_linktype';
import * as migration_20251223_161556_blog_authors_posts from './20251223_161556_blog_authors_posts';
import * as migration_20251223_162129_blog_teaser_block from './20251223_162129_blog_teaser_block';
import * as migration_20251223_163410_blog_posts_block from './20251223_163410_blog_posts_block';
import * as migration_20251225_103510 from './20251225_103510';
import * as migration_20251225_131558_add_industries_focus_type from './20251225_131558_add_industries_focus_type';
import * as migration_20251225_134727_add_new_industry_icons from './20251225_134727_add_new_industry_icons';

export const migrations = [
  {
    up: migration_20251222_173001.up,
    down: migration_20251222_173001.down,
    name: '20251222_173001',
  },
  {
    up: migration_20251223_121910.up,
    down: migration_20251223_121910.down,
    name: '20251223_121910',
  },
  {
    up: migration_20251223_135248_add_textblock_variant.up,
    down: migration_20251223_135248_add_textblock_variant.down,
    name: '20251223_135248_add_textblock_variant',
  },
  {
    up: migration_20251223_143053_footer_settings.up,
    down: migration_20251223_143053_footer_settings.down,
    name: '20251223_143053_footer_settings',
  },
  {
    up: migration_20251223_144551_legal_page_links.up,
    down: migration_20251223_144551_legal_page_links.down,
    name: '20251223_144551_legal_page_links',
  },
  {
    up: migration_20251223_150711_pricing_blocks.up,
    down: migration_20251223_150711_pricing_blocks.down,
    name: '20251223_150711_pricing_blocks',
  },
  {
    up: migration_20251223_152914_pricing_cta_linktype.up,
    down: migration_20251223_152914_pricing_cta_linktype.down,
    name: '20251223_152914_pricing_cta_linktype',
  },
  {
    up: migration_20251223_153902_pricing_addons_pricetype.up,
    down: migration_20251223_153902_pricing_addons_pricetype.down,
    name: '20251223_153902_pricing_addons_pricetype',
  },
  {
    up: migration_20251223_154733_pricing_addons_dual_price.up,
    down: migration_20251223_154733_pricing_addons_dual_price.down,
    name: '20251223_154733_pricing_addons_dual_price',
  },
  {
    up: migration_20251223_155805_hero_cta_linktype.up,
    down: migration_20251223_155805_hero_cta_linktype.down,
    name: '20251223_155805_hero_cta_linktype',
  },
  {
    up: migration_20251223_161556_blog_authors_posts.up,
    down: migration_20251223_161556_blog_authors_posts.down,
    name: '20251223_161556_blog_authors_posts',
  },
  {
    up: migration_20251223_162129_blog_teaser_block.up,
    down: migration_20251223_162129_blog_teaser_block.down,
    name: '20251223_162129_blog_teaser_block',
  },
  {
    up: migration_20251223_163410_blog_posts_block.up,
    down: migration_20251223_163410_blog_posts_block.down,
    name: '20251223_163410_blog_posts_block',
  },
  {
    up: migration_20251225_103510.up,
    down: migration_20251225_103510.down,
    name: '20251225_103510',
  },
  {
    up: migration_20251225_131558_add_industries_focus_type.up,
    down: migration_20251225_131558_add_industries_focus_type.down,
    name: '20251225_131558_add_industries_focus_type',
  },
  {
    up: migration_20251225_134727_add_new_industry_icons.up,
    down: migration_20251225_134727_add_new_industry_icons.down,
    name: '20251225_134727_add_new_industry_icons'
  },
];
