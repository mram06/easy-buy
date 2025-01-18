import ejs from "ejs";
// import pdf from 'html-pdf'

// class PdfCreator {
//   static async generatePdf(outputPath, templatePath, data) {
//     const html = await ejs.renderFile(templatePath, data)
//     return new Promise((resolve, reject) => {
//       pdf.create(html).toFile(outputPath, (err, res) => {
//         if (err) return reject(err)
//         resolve(res)
//       })
//     })
//   }
// }

// export default PdfCreator

import puppeteer from "puppeteer";
import fs from "fs";

class PdfCreator {
  constructor() {
    this.browser = null;
  }

  static async init() {
    if (!this.browser) {
      this.browser = await puppeteer.launch();
    }
  }

  static async generatePdf(outputPath, templatePath, data) {
    await this.init();
    const html = await ejs.renderFile(templatePath, data);
    const page = await this.browser.newPage();

    await page.setContent(html);

    const pdfBuffer = await page.pdf();

    await fs.promises.writeFile(outputPath, pdfBuffer);

    await page.close();
  }

  static async close() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}

export default PdfCreator;
