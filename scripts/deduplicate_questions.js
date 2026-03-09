import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '../src/data/questions_2022.json');

try {
    const data = fs.readFileSync(filePath, 'utf8');
    const questions = JSON.parse(data);

    if (Array.isArray(questions)) {
        const uniqueQuestions = new Map();
        questions.forEach(q => {
            uniqueQuestions.set(q.id, q);
        });

        // Sort by ID
        const sortedQuestions = Array.from(uniqueQuestions.values()).sort((a, b) => a.id - b.id);

        fs.writeFileSync(filePath, JSON.stringify(sortedQuestions, null, 2), 'utf8');
        console.log(`Deduplicated. Old count: ${questions.length}, New count: ${sortedQuestions.length}`);
    }
} catch (err) {
    console.error(err);
}
