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
  static async generatePdf(outputPath, templatePath, data) {
    // Рендеринг HTML з шаблону EJS
    const html = await ejs.renderFile(templatePath, data);

    // Запуск браузера Puppeteer
    const browser = await puppeteer.launch();

    // Створення нової сторінки
    const page = await browser.newPage();

    // Завантаження рендереного HTML в сторінку Puppeteer
    await page.setContent(html);

    // Генерація PDF
    const pdfBuffer = await page.pdf();

    // Запис PDF у файл

    await fs.promises.writeFile(outputPath, pdfBuffer);

    // Закриття тільки поточної вкладки (сторінки)
    await page.close();

    // Повертаємо шлях до збереженого PDF, як у початковій логіці
    return { outputPath };
  }
}

export default PdfCreator;
