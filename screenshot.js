const puppeteer = require("puppeteer");

const tempo = parseInt(process.env.TEMPO) || 5000;

const captureScreenshot = async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).send("URL não fornecida");

  let browser;
  try {
    browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"]
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    await page.waitForSelector("body");

    await new Promise(r => setTimeout(r, tempo));

    const screenshot = await page.screenshot();
    res.set("Content-Type", "image/png");
    res.send(screenshot);

  } catch (err) {
    console.error("Erro ao capturar screenshot:", err);
    res.status(500).send("Erro interno");
  } finally {
    if (browser) await browser.close();
  }
};

module.exports = { captureScreenshot };
