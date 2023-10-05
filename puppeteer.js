const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // Set headless to true if you don't want to see the browser window
  const page = await browser.newPage();

  // Navigate to the Google login page
  await page.goto('https://accounts.google.com');

  // Wait for the email input field and enter your email
  await page.waitForSelector('input[type="email"]');
  await page.type('input[type="email"]', 'avishek@ibos.io');

  // from submit
  await page.keyboard.press('Enter');

  // Wait for the password input field and enter your password
  await page.waitForSelector('input[type="password"]', { visible: true });
  await page.type('input[type="password"]', 'aVishek@143');

  // from submit
  await page.keyboard.press('Enter');
  // Wait for the login to complete (you can add more precise checks if needed)
  await page.waitForNavigation();

  // Visit Google Maps
  await page.goto('https://www.google.com/maps');

  // Type your search query into the Google Maps search bar
  await page.type('#searchboxinput', '23.7525255,90.3816032');
  await page.keyboard.press('Enter');

  // Click the "Add a missing place" button
  await page.waitForSelector('div[aria-label="Add a missing place"]');
  const element = await page.$('div[aria-label="Add a missing place"]');

  if (element) {
    await element.click(); // Click the element
  } else {
    console.log("Element not found");
  }

  await page.waitForSelector('#rap-on-boq');
  const iframeElement = await page.$('#rap-on-boq');

  if (iframeElement) {
    const frame = await iframeElement.contentFrame();
    await frame.waitForSelector('input');
    const iframeInput = await frame.$('input');
    
    if (iframeInput) {
      await iframeInput.type("demo");
      await page.keyboard.press('Enter');
    } else {
      console.log("Input element inside the iframe not found");
    }
  } else {
    console.log("iframeElement not found");
  }

  // Close the browser when done
  // await browser.close();
})();
