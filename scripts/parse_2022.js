import fs from 'fs';
import path from 'path';

const inputFile = path.join(process.cwd(), 'scripts', 'raw_2022.txt');
const outputFile = path.join(process.cwd(), 'src', 'data', 'questions_2022.json');

const rawText = fs.readFileSync(inputFile, 'utf-8');

const questions = [];
const blocks = rawText.split('Section:       GENERAL TEST').slice(1); // Skip header

let idCounter = 1;

blocks.forEach(block => {
    // Basic extraction
    const itemMatch = block.match(/Item No:\s+(\d+)/);
    const idMatch = block.match(/Question ID:\s+(\d+)/);

    // In this specific file, we noticed the content is empty, so we just capture the ID
    // and create a skeleton.

    if (itemMatch) {
        questions.push({
            id: parseInt(itemMatch[1]), // Use Item No as the ID for consistency with 1, 2, 3...
            text: "Question content missing from PDF extraction. Please update manually.",
            options: ["Option 1", "Option 2", "Option 3", "Option 4"],
            isFigure: false,
            source: "CUET-GAT-2022",
            correctAnswerIndex: 0,
            explanation: "Explanation pending."
        });
    }
});

fs.writeFileSync(outputFile, JSON.stringify(questions, null, 2));
console.log(`Parsed ${questions.length} questions to ${outputFile}`);
