const puppeteer = require("puppeteer")
const fs = require('fs')
let browser;

(async () => {
    const browser = await puppeteer.launch({headless:true})
    const [page] = await browser.pages()

    const url = "https://petrolprices.economie.fgov.be/petrolprices/?locale=nl"
    await page.goto(url, {waitUntil: "domcontentloaded"})

    await page.waitForSelector('#petrolTable_data > tr:nth-child(3) > td:nth-child(2)')
    let eprice = await page.$('#petrolTable_data > tr:nth-child(3) > td:nth-child(2)')
    let price = await page.evaluate(el => el.textContent, eprice)

    await page.waitForSelector('#petrolTable > div.ui-datatable-header.ui-widget-header.ui-corner-top > span:nth-child(2)')
    let edate = await page.$('#petrolTable > div.ui-datatable-header.ui-widget-header.ui-corner-top > span:nth-child(2)')
    let date = await page.evaluate(el => el.textContent, edate)

    const o = {"date": date, "price": price}
    let json = JSON.parse(fs.readFileSync("history.json"))
    json.unshift(o)
    json = JSON.stringify(json)
    fs.writeFile("history.json", json, (err) => console.log(err))

  const data = await page.$$eval("tr", els =>
  els.slice(1).map(e => [...e.querySelectorAll("td")]
    .slice(0, 2).map(e => e.textContent)
  )
)

  console.table(data);
})()
.catch(err => console.error(err))
.finally(
  () => {browser?.close()
    process.exit()
  }
)