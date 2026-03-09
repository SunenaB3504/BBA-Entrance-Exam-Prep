
export const syllabusChartData = {
    labels: ['Reading Comprehension', 'Vocabulary & Idioms', 'Verbal Ability', 'Grammar/Literary Devices'],
    data: [30, 25, 25, 20]
};

export const missionBriefing = [
    {
        title: "Time Pressure",
        icon: "⏳",
        content: "You have roughly 1 minute per question (45 mins for 40 questions). This includes reading time for long passages."
    },
    {
        title: "Choice is Power",
        icon: "🎯",
        content: "There are 50 questions, but you only answer 40. The Maximin strategy relies on skipping the 10 hardest/riskiest questions."
    },
    {
        title: "Negative Marking",
        icon: "⚠️",
        content: "A wrong answer deducts 1 mark. A skipped question deducts nothing. Accuracy > Volume."
    }
];

export const syllabusTopics = [
    "Reading Comprehension (3 Types)",
    "Verbal Ability",
    "Rearranging the Parts",
    "Choosing the Correct Word",
    "Synonyms & Antonyms",
    "Vocabulary"
];

export const weightageData = [
    {
        title: "Reading Comprehension (RC)",
        desc: "Usually 3 passages (Factual, Narrative, Literary) with 5-6 questions each.",
        strategy: "High accuracy potential, time-consuming."
    },
    {
        title: "Vocabulary & Idioms",
        desc: "Includes Synonyms, Antonyms, Idioms ('Feather in cap'), and One-word subs.",
        strategy: "Fast to answer, high risk if unsure."
    }
];

export const playbookTabs = [
    { id: 'rc', label: 'Reading Comprehension' },
    { id: 'vocab', label: 'Vocabulary & Idioms' },
    { id: 'literary', label: 'Literary Devices' },
    { id: 'grammar', label: 'Verbal Ability' }
];

export const playbookContent = {
    rc: {
        title: 'The "Bottom-Up" Technique',
        intro: "Most students read the passage first. Global speed-reading experts suggest the reverse for standardized tests:",
        steps: [
            "Step 1: Scan Questions. Read the question stems (not options) first. Identify keywords (names, dates, specific terms).",
            "Step 2: Skim Passage. Read the first and last paragraph fully. Skim the middle for the keywords you identified.",
            "Step 3: Hunt & Peck. When you see a keyword, slow down and read that sentence in detail."
        ],
        exampleBox: {
            title: "Example from 2022 Paper",
            content: "\"There is a lovely story of a tree and a little boy... 'Cut down my branches and build your house'...\"",
            strategy: "This is a Narrative passage. The questions often follow the chronology of the story. Track the boy's age changes."
        },
        sampleQuestion: {
            question: "In the story of the tree (2022), why did the tree ask the boy to cut its branches?",
            options: [
                "To make a fire",
                "To build a house",
                "To build a ship",
                "To make furniture"
            ],
            correct: 1,
            feedback: "Correct! The text explicitly states: \"I am going to marry and I want a house... Cut down my branches.\""
        }
    },
    vocab: {
        title: "Context & Etymology Strategy",
        intro: "Vocabulary questions in CUET are often direct antonyms/synonyms. If you don't know the word, use these methods:",
        steps: [
            "Root Word Analysis: Example: 'Malice'. 'Mal' means bad (Malfunction, Malnutrition).",
            "Tone Check: Is the word positive or negative? If the word is 'Stringent' (Negative/Hard), the antonym must be positive/soft (e.g., 'Lenient').",
            "Elimination: If two options mean the same thing, neither is likely the answer."
        ],
        exampleBox: {
            title: "Past Paper Insight (2023)",
            content: "Idioms are common. E.g., \"Feather in one's cap\" or \"Have little in common\". Study lists of common English idioms."
        },
        sampleQuestion: {
            question: "Select the OPPOSITE in meaning to: \"Stringent\"",
            options: [
                "Vehement (Strong/Forceful)",
                "Severe (Strict)",
                "General (Broad)",
                "Lenient (Permissive)"
            ],
            correct: 3,
            feedback: "Correct! Stringent means strict/precise. Lenient is the direct opposite."
        }
    },
    literary: {
        title: "Identifying Figures of Speech",
        intro: "CUET loves asking for Poetic Devices. Memorize these key definitions found in past papers:",
        definitions: [
            { term: "Oxymoron", def: "Two opposite words together.", ex: "Love-hate relationship" },
            { term: "Simile", def: "Comparison using 'like' or 'as'.", ex: "White as snow" },
            { term: "Metaphor", def: "Direct comparison.", ex: "All the world is a stage" },
            { term: "Personification", def: "Giving human traits to objects.", ex: "The wind howled" }
        ],
        sampleQuestion: {
            question: "Identify the figure of speech: \"Tom and Jerry share a love-hate relationship\"",
            options: [
                "Personification",
                "Metaphor",
                "Oxymoron",
                "Simile"
            ],
            correct: 2,
            feedback: "Correct! Love and Hate are contradictory terms placed together, creating an Oxymoron."
        }
    },
    grammar: {
        title: "Rearrangement & Sentence Structure",
        intro: "For 'Rearranging parts' (Jumbled sentences), look for the Independent Clause.",
        steps: [
            "The Subject First: Find the noun/pronoun that starts the action.",
            "Linkers: Words like 'however', 'therefore', 'because' usually come in the middle.",
            "Acronym Method: Look at the options first (e.g., ABCD, DCBA). Try the first part of each option to see which makes sense as a starter."
        ],
        sampleQuestion: {
            question: "Rearrange: (A) to the market (B) went (C) yesterday (D) she",
            options: [
                "1. A B C D",
                "2. D B A C",
                "3. C A B D",
                "4. B D A C"
            ],
            correct: 1,
            feedback: "Correct! \"She (D) went (B) to the market (A) yesterday (C).\""
        }
    }
};
