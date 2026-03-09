
import fs from 'fs';
import path from 'path';

// INPUT / OUTPUT CONFIGURATION
const inputFile = path.join(process.cwd(), 'scripts', 'raw_acc_2024.txt');
const outputFile = path.join(process.cwd(), 'src', 'data', 'questions_accountancy_2024.json');

// LOGIC
const rawText = fs.readFileSync(inputFile, 'utf-8');
const questions = [];

// Split by "--- PAGE X ---" to handle logical blocks
const pages = rawText.split(/--- PAGE \d+ ---/);

// Helper to remove Assamese text (roughly)
// We assume English text is standard ASCII/Latin extended
const filterEnglish = (text) => {
    // Remove lines with heavy non-english characters? 
    // Or just look for specific patterns.
    // For now, let's keep it simple: split by lines, keep lines that look like English ques/options
    return text.split('\n').filter(line => {
        // Very basic heuristic: if it has more than 50% ascii chars, it's likely english
        const asciiCount = (line.match(/[\x00-\x7F]/g) || []).length;
        return asciiCount / line.length > 0.5;
    }).join('\n');
};

let currentQuestion = null;
let idCounter = 1;

// Regex patterns
const questionStartRegex = /^\s*(\d+)\.\s+(.*)/;
const optionRegex = /^\s*\((\d+|[A-D])\)\s+(.*)/;

// We process line by line across all pages
const allLines = rawText.split('\n');

allLines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    // Skip Assamese/Page markers
    if (trimmed.startsWith('--- PAGE') || trimmed.includes('SPACE FOR ROUGH WORK')) return;

    // Naive heuristic to ignore Assamese lines (lines with many non-ascii)
    const asciiCount = (trimmed.match(/[\x00-\x7F]/g) || []).length;
    if (asciiCount < trimmed.length * 0.5) return;

    // Match Start of Question "1. Text...", "22. Text..."
    const qMatch = trimmed.match(questionStartRegex);
    if (qMatch) {
        // Save previous question
        if (currentQuestion) {
            questions.push(currentQuestion);
        }

        // Start new question
        currentQuestion = {
            id: parseInt(qMatch[1]),
            text: qMatch[2],
            options: [],
            isFigure: false,
            source: "CUET-ACCOUNTANCY-2024",
            correctAnswerIndex: 0,
            explanation: "Detailed explanation to be added."
        };
        return;
    }

    // Match Options "(1) Text", "(2) Text", "(A) Text"
    // Note: This PDF has multi-part questions (List I/II), which makes parsing complex.
    // We will capture lines into 'text' if they are not clear options.

    const optMatch = trimmed.match(/^\s*\(([1-4])\)\s+(.*)/);
    if (currentQuestion) {
        if (optMatch) {
            currentQuestion.options.push(optMatch[2]);
        } else {
            // It might be part of the question text or a sub-list (A), (B)..
            // If it starts with (A), (B), etc., we append to text for now
            // formatting manually later is often safer for complex match-list questions.
            currentQuestion.text += " " + trimmed;
        }
    }
});

// Push the last one
if (currentQuestion) {
    questions.push(currentQuestion);
}

// Post-processing to clean up options
// Many questions in this PDF are "Match List" type where the options are combinations
// e.g. (1) A-I, B-II... 
// Our naive regex might capture these well, but let's verify count.

const validQuestions = questions.filter(q => q.options.length >= 4);

console.log(`Extracted ${validQuestions.length} valid questions from total ${questions.length} candidates.`);

fs.writeFileSync(outputFile, JSON.stringify(validQuestions, null, 2));
