import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('http://localhost:5174/');
  await page.waitForSelector('.hero-name-text');
  await page.waitForTimeout(1000);

  const data = await page.evaluate(() => {
    const tile = document.querySelector('.tile-hero-scroll-container');
    const scroll = tile.querySelector('div[style*="flex-direction: column"]');
    const workSection = document.querySelector('.hero-work-section');
    const workBento = document.querySelector('.work-wrapper');
    const workContainer = document.querySelector('[class*="work-list-container"]');

    return {
      tile: { height: tile.clientHeight, scrollHeight: tile.scrollHeight },
      scroll: { height: scroll.clientHeight, scrollHeight: scroll.scrollHeight },
      workSection: { rect: workSection.getBoundingClientRect().toJSON(), bottomPadding: window.getComputedStyle(workSection).paddingBottom },
      workBento: { rect: workBento.getBoundingClientRect().toJSON(), bottomPadding: window.getComputedStyle(workBento).paddingBottom, bottomMargin: window.getComputedStyle(workBento).marginBottom },
      workContainer: { rect: workContainer.getBoundingClientRect().toJSON() }
    };
  });
  console.log(JSON.stringify(data, null, 2));

  await page.evaluate(() => {
    const tile = document.querySelector('.tile-hero-scroll-container');
    tile.scrollTop = tile.scrollHeight;
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'bottom.png' });
  
  await browser.close();
})();
