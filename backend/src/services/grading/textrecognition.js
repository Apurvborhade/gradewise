import Tesseract, { createWorker } from 'tesseract.js'
import path from 'path'
import { exec } from 'child_process'
import fs from 'fs'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default async function detectText(data, fileType) {
    if (fileType.startsWith('image')) {
        const worker = await createWorker('eng')
        const ret = await worker.recognize(data.publicUrl)
        const studentAnswer = ret.data.text;
        await worker.terminate();
        return studentAnswer
    } else {
        return new Promise((resolve, reject) => {
            const outputDir = path.join(__dirname, 'temp');  // Temporary storage
            if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir); // Ensure directory exists

            const outputFile = path.join(outputDir, 'page');
            // Convert PDF pages to images in memory using pdf-poppler
            exec(`pdftoppm -png "${data.publicUrl}" "${outputFile}"`, async (error) => {
                if (error) return reject(error);

                const imageFiles = fs.readdirSync(outputDir)
                    .filter(file => file.startsWith('page') && file.endsWith('.png'));

                let extractedText = '';

                for (const file of imageFiles) {
                    const imagePath = path.join(outputDir, file);

                    // Run OCR on extracted image
                    const { data: { text } } = await Tesseract.recognize(imagePath, 'eng');

                    extractedText += text + '\n\n';

                    // Delete image after processing
                    fs.unlinkSync(imagePath);
                }

                resolve(extractedText);
            });
        });
    }
}