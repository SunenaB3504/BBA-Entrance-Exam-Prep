import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '../src/data/questions_2022.json');

try {
    const data = fs.readFileSync(filePath, 'utf8');
    let questions = JSON.parse(data);

    if (Array.isArray(questions)) {
        questions = questions.filter(q => q.id <= 50);

        fs.writeFileSync(filePath, JSON.stringify(questions, null, 2), 'utf8');
        console.log(`Successfully truncated questions. New count: ${questions.length}`);
    } else {
        console.error('File content is not an array.');
    }
} catch (err) {
    console.error('Error processing file:', err);
}
