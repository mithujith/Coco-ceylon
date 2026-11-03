import test from 'node:test';
import assert from 'node:assert/strict';
import {
  COMPANY_INFO,
  CORE_STATS,
  CORE_PILLARS,
  HERO_SLIDES,
  WHY_CHOOSE_US,
  ARTICLES,
  GALLERY_ITEMS,
  PRODUCTS_CATALOG,
} from '../src/data/content.ts';

test('Company profile preserves original contact details', () => {
  assert.equal(COMPANY_INFO.phonePrimary, '+94 76 7230085');
  assert.equal(COMPANY_INFO.phoneSecondary, '0039 3926631982');
  assert.equal(COMPANY_INFO.email, 'ceylonneyansacoco@gmail.com');
  assert.equal(COMPANY_INFO.location, 'Kottamaduwa Serukale Sri Lanka');
  assert.equal(COMPANY_INFO.copyright, '© 2026 CODEBOX94. All Rights Reserved');
  assert.ok(COMPANY_INFO.heroDescription.includes('Ceylon Neyansa Coco Products (Pvt) Ltd'));
});

test('Core stats preserve 100% original values', () => {
  const statValues = CORE_STATS.map((s) => s.value);
  assert.ok(statValues.includes('1999 +'));
  assert.ok(statValues.includes('6984 +'));
  assert.ok(statValues.includes('69 K+'));
  assert.ok(statValues.includes('98 %'));
  assert.ok(statValues.includes('34 +'));
});

test('Hero slides preserve original headings', () => {
  assert.equal(HERO_SLIDES.length, 4);
  assert.ok(HERO_SLIDES.some((s) => s.title.includes('trusted growers')));
  assert.ok(HERO_SLIDES.some((s) => s.title.includes('Sustainable Solutions')));
  assert.ok(HERO_SLIDES.some((s) => s.title.includes('soil mixtures')));
  assert.ok(HERO_SLIDES.some((s) => s.title.includes('compressed growing medium')));
});

test('All 3 original blog articles preserve exact titles and paragraphs', () => {
  assert.equal(ARTICLES.length, 3);
  const titles = ARTICLES.map((a) => a.title);
  assert.ok(titles.includes('Bringing Ceylon Coconut Products to Global Markets'));
  assert.ok(titles.includes('Our Commitment to Quality and Sustainability'));
  assert.ok(titles.includes('The Natural Goodness of Ceylon Coconut'));

  for (const art of ARTICLES) {
    assert.ok(art.content.length >= 4);
    assert.ok(art.date === '28 August, 2026');
  }
});

test('Gallery items preserve all authentic images', () => {
  assert.equal(GALLERY_ITEMS.length, 15);
  for (const item of GALLERY_ITEMS) {
    assert.ok(item.image.includes('ceylonneyansacocoproducts.org'));
  }
});

test('Products catalog includes all 4 core product categories', () => {
  assert.equal(PRODUCTS_CATALOG.length, 4);
  const skus = PRODUCTS_CATALOG.map((p) => p.sku);
  assert.ok(skus.includes('CNCP-CPB-5KG'));
  assert.ok(skus.includes('CNCP-OHC-GRADEA'));
  assert.ok(skus.includes('CNCP-BRQ-650G'));
  assert.ok(skus.includes('CNCP-WHC-PREM'));
});
