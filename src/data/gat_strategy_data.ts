
export const syllabusData = [
    {
        id: "gk",
        title: "General Knowledge & Current Affairs",
        icon: "🌍",
        topics: [
            { id: "awards", label: "Awards & Honors", desc: "e.g., Miss Universe, Nobel" },
            { id: "history", label: "Indian History", desc: "e.g., INC founding, Freedom Struggle" },
            { id: "personalities", label: "Important Personalities", desc: "Famous firsts, Leaders" },
            { id: "bodies", label: "International Bodies", desc: "UN, WHO, Headquarters" }
        ],
        tip: "Focus on the last 6 months of major events. Static GK history is usually modern Indian history."
    },
    {
        id: "mental",
        title: "General Mental Ability",
        icon: "🧠",
        topics: [
            { id: "coding", label: "Coding & Decoding", desc: "Letter shifts, Number coding" },
            { id: "series", label: "Series Completion", desc: "AP/GP, Mixed series" },
            { id: "analogy", label: "Analogy", desc: "Word/Number relationships" },
            { id: "blood", label: "Blood Relations", desc: "Family tree analysis" }
        ],
        tip: "For coding questions, write A-Z with numbers 1-26 on your rough sheet immediately."
    },
    {
        id: "quant",
        title: "Numerical Ability (Quant)",
        icon: "📐",
        topics: [
            { id: "percent", label: "Percentages", desc: "Profit/Loss, change %" },
            { id: "mensuration", label: "Mensuration", desc: "Surface Area, Volume, 2D/3D" },
            { id: "algebra", label: "Basic Algebra", desc: "Equations, Identities" },
            { id: "ratios", label: "Ratios", desc: "Proportions, Mixtures" }
        ],
        tip: "Memorize formulas for Surface Area and Volume. Practice percentage change calculations."
    },
    {
        id: "logic",
        title: "Logical & Analytical Reasoning",
        icon: "⚖️",
        topics: [
            { id: "syllogism", label: "Syllogisms", desc: "Venn Diagrams" },
            { id: "ranking", label: "Ranking & Order", desc: "Queue positions" },
            { id: "conclusion", label: "Statement & Conclusion", desc: "Logical deduction" },
            { id: "linear", label: "Linear Arrangements", desc: "Seating arrangement" }
        ],
        tip: "Draw diagrams. Never assume information not explicitly stated in the premises."
    },
    {
        id: "visual",
        title: "Visual / Non-Verbal",
        icon: "👁️",
        topics: [
            { id: "mirror", label: "Mirror & Water Images", desc: "Reflections" },
            { id: "pattern", label: "Pattern Completion", desc: "Missing quadrant" },
            { id: "figcount", label: "Figure Counting", desc: "Triangles in squares" },
            { id: "paper", label: "Paper Folding", desc: "Punch hole patterns" }
        ],
        tip: "Use option elimination. Find one distinct feature (like a dot) and track its movement."
    }
];

export interface Technique {
    title: string;
    desc: string;
    steps: string[];
    example: string;
}

export const techniquesData: Record<string, Technique> = {
    // GK
    "awards": {
        title: "Awards & Honors Strategy",
        desc: "Use associating memory techniques. Link the Recipient's name to the Award name using a mental image.",
        steps: [
            "Step 1: Keyword Association - Create a funny or weird image connecting the person to the award.",
            "Step 2: Compare - Always check 'First Recipient' vs 'Current Recipient'.",
            "Step 3: Fields - Eliminate options knowing who belongs to Sports vs Literature."
        ],
        example: "Geetanjali Shree -> 'Geet' (Song) -> 'Book' (Booker) -> Book that sings."
    },
    "history": {
        title: "Indian History Strategy",
        desc: "Focus on the Modern History timeline (1857-1947).",
        steps: [
            "Step 1: Create a Timeline of major events (Revolt 1857 -> INC 1885 -> Gandhi 1915).",
            "Step 2: Know the 'Who' (Viceroy/Leader) and 'Why' (Cause) of major movements.",
            "Step 3: Mnemonic for Governor Generals: 'BaT CaN' (Bentinck, Canning, etc)."
        ],
        example: "INC Founding: 1885 by A.O. Hume. First President: W.C. Banerjee."
    },
    "personalities": {
        title: "Important Personalities",
        desc: "Focus on Titles, Firsts, and Books written.",
        steps: [
            "Step 1: Nicknames (Iron Man = Patel).",
            "Step 2: Books (Discovery of India = Nehru).",
            "Step 3: Slogans (Do or Die = Gandhi)."
        ],
        example: "Question: 'Frontier Gandhi'? Answer: Khan Abdul Ghaffar Khan."
    },
    "bodies": {
        title: "International Bodies",
        desc: "Focus on HQ locations and Heads.",
        steps: [
            "Step 1: Geneva Group (WHO, ILO, WTO all in Geneva).",
            "Step 2: Washington Group (WB, IMF - Money is in US).",
            "Step 3: Vienna (Atomic/Energy - IAEA, OPEC)."
        ],
        example: "Where is HQ of WHO? Geneva."
    },

    // Mental Ability
    "coding": {
        title: "Coding & Decoding",
        desc: "Decipher patterns in letter or number shifts.",
        steps: [
            "Step 1: Write A-Z with numbers 1-26.",
            "Step 2: Check standard shifts (+1, +2, -1).",
            "Step 3: Check Reverse pairs (A-Z, B-Y). Mnemonic: 'AZad BoY'."
        ],
        example: "TRIANGLE (+2) -> VTKCPING."
    },
    "series": {
        title: "Series Completion",
        desc: "Find the missing number in a specific sequence.",
        steps: [
            "Step 1: Check the Difference between terms. Is it constant?",
            "Step 2: Check 'Difference of Difference'.",
            "Step 3: Check Squares/Cubes nearby (n² + 1)."
        ],
        example: "2, 5, 10, 17, ? -> Differences are 3, 5, 7. Next diff is 9. 17+9 = 26. (Pattern n²+1)."
    },
    "analogy": {
        title: "Analogy",
        desc: "Find the relationship: A is to B as C is to ?",
        steps: [
            "Step 1: Define relationship sentence (e.g., 'A is the capital of B').",
            "Step 2: Apply exact sentence to C.",
            "Step 3: Watch for tricky secondary meanings."
        ],
        example: "Lion : Pride :: Wolf : ? (Pack)."
    },
    "blood": {
        title: "Blood Relations",
        desc: "Family tree analysis.",
        steps: [
            "Step 1: Draw the tree. Males (+), Females (-).",
            "Step 2: Vertical lines for generations, Horizontal for siblings.",
            "Step 3: Double line for spouses."
        ],
        example: "Point to a man... 'He is the son of my father's only son'. Speaker is the father."
    },

    // Quant
    "percent": {
        title: "Percentages",
        desc: "Calculations involving base 100.",
        steps: [
            "Step 1: A% of B = (A*B)/100.",
            "Step 2: X is what % of Y? -> (X/Y)*100.",
            "Step 3: Shortcut: 10% = shift decimal one left. 1% = shift two left."
        ],
        example: "20% of 500 = 10% (50) * 2 = 100."
    },
    "mensuration": {
        title: "Mensuration",
        desc: "Areas and Volumes. Focus on Formula application.",
        steps: [
            "Step 1: Identify Shape (Cube, Sphere).",
            "Step 2: Write Formula (SA = 6a²).",
            "Step 3: Watch units (cm vs m).",
            "Step 4: Percentage Change method for dimension changes."
        ],
        example: "Side doubles -> Area becomes 4 times (2²)."
    },
    "algebra": {
        title: "Basic Algebra",
        desc: "Solving for X and Identities.",
        steps: [
            "Step 1: (a+b)² = a² + b² + 2ab.",
            "Step 2: (a-b)(a+b) = a² - b².",
            "Step 3: Linear equations - isolate variable."
        ],
        example: "If x + 1/x = 2, then x = 1."
    },
    "ratios": {
        title: "Ratios & Interpretations",
        desc: "comparing quantities.",
        steps: [
            "Step 1: A:B = 2:3. Total parts = 5.",
            "Step 2: If finding share, amount * (share/total).",
            "Step 3: Combining ratios A:B and B:C -> Use 'Zig-Zag' multiplication."
        ],
        example: "A:B=2:3, B:C=4:5 -> A:B:C = 8:12:15."
    },

    // Logic
    "syllogism": {
        title: "Syllogisms",
        desc: "Deductive logic with Venn Diagrams.",
        steps: [
            "Step 1: Draw basic diagram for statements.",
            "Step 2: Do NOT overlap unless forced.",
            "Step 3: Conclusion follows only if true in ALL diagrams."
        ],
        example: "All A are B. Some B are C. -> Some A are C? No, not definite."
    },
    "ranking": {
        title: "Ranking & Order",
        desc: "Position in queues.",
        steps: [
            "Step 1: Total = (Left + Right) - 1.",
            "Step 2: Draw a line map.",
            "Step 3: Carefully count overlaps."
        ],
        example: "10th from L, 10 from R. Total = 10+10-1 = 19."
    },
    "conclusion": {
        title: "Statement & Conclusion",
        desc: "Derive truth from given text.",
        steps: [
            "Step 1: Accept statement as 100% Truth.",
            "Step 2: Do not bring outside knowledge.",
            "Step 3: Conclusion must be a direct result."
        ],
        example: "Statement: 'Only corrupt are punished'. Concl: 'He is punished, so he is corrupt'."
    },
    "linear": {
        title: "Linear Arrangement",
        desc: "Seating people in a row.",
        steps: [
            "Step 1: Fix the definite information first (A is at extreme right).",
            "Step 2: Use relative clues (B is 2nd to left of A).",
            "Step 3: Fill gaps."
        ],
        example: "5 people facing North. Left is your Left."
    },

    // Visual
    "mirror": {
        title: "Mirror & Water Images",
        desc: "Lateral inversion.",
        steps: [
            "Step 1: Mirror: Left <-> Right. Top/Bottom Static.",
            "Step 2: Water: Top <-> Bottom. Left/Right Static.",
            "Step 3: Find the 'Asymmetrical' letter to check first (e.g., P, L)."
        ],
        example: "Mirror image of 'B' looks like flipped B."
    },
    "pattern": {
        title: "Pattern Completion",
        desc: "Complete the grid.",
        steps: [
            "Step 1: Check rotation of elements (CW / ACW).",
            "Step 2: Check shading pattern.",
            "Step 3: Check number of lines."
        ],
        example: "Quarter circle moving 90 degrees."
    },
    "figcount": {
        title: "Figure Counting",
        desc: "Count triangles or squares.",
        steps: [
            "Step 1: Number the small parts.",
            "Step 2: Count 1-part figures, then 2-part combos, etc.",
            "Step 3: For square grids, use formula: n² + (n-1)²..."
        ],
        example: "Square with diagonals has 8 triangles."
    },
    "paper": {
        title: "Paper Folding",
        desc: "Punched holes in folded paper.",
        steps: [
            "Step 1: Work backwards from the last fold.",
            "Step 2: Treat each unfold as a Mirror Image reflection.",
            "Step 3: Draw it roughly on paper if stuck."
        ],
        example: "Fold quartely, punch center. Unfold = 4 holes symmetric."
    }
};

export const practiceQuizData = [
    {
        id: 1,
        topic: "Mensuration",
        question: "If each side of a cube is reduced by 50%, the surface area will be reduced by:",
        options: ["75%", "50%", "25%", "100%"],
        correct: 0,
        explanation: "Surface Area = 6a². New side = a/2. New SA = 6(a/2)² = 6(a²/4) = 1.5a². Reduction = 6a² - 1.5a² = 4.5a². % Reduction = (4.5/6)*100 = 75%."
    },
    {
        id: 2,
        topic: "Coding-Decoding",
        question: "In a certain language TRIANGLE is written as VTKCPING. How will RECTANGLE be written?",
        options: ["TGEUCPING", "TGDUCPING", "UGECPING", "VGECPING"],
        correct: 0,
        explanation: "Pattern is +2 letters. R(+2)=T, E(+2)=G, C(+2)=E, T(+2)=V... Result is TGEUCPING."
    },
    {
        id: 3,
        topic: "Algebraic Operation",
        question: "If * is an operation such that a*b = 3a - 4b, find the value of 3*4.",
        options: ["0", "-7", "7", "-1"],
        correct: 1,
        explanation: "Substitute a=3, b=4 into 3a - 4b. 3(3) - 4(4) = 9 - 16 = -7."
    },
    {
        id: 4,
        topic: "Ranking",
        question: "In a row of 40 children, A is 13th from Left and B is 9th from Right. How many children are between A and B?",
        options: ["18", "14", "16", "15"],
        correct: 0,
        explanation: "B is 9th from Right, so B is (40-9+1) = 32nd from Left. A is 13th from Left. Children between = (32 - 13) - 1 = 18."
    },
    {
        id: 5,
        topic: "General Knowledge",
        question: "Who founded the Indian National Congress?",
        options: ["W.C. Banerjee", "A.O. Hume", "M.K. Gandhi", "J.L. Nehru"],
        correct: 1,
        explanation: "The Indian National Congress was founded by Allan Octavian Hume (A.O. Hume) in 1885."
    },
    {
        id: 6,
        topic: "GK - Awards",
        question: "Which Indian author won the International Booker Prize for 'Tomb of Sand'?",
        options: ["Arundhati Roy", "Geetanjali Shree", "Jhumpa Lahiri", "Kiran Desai"],
        correct: 1,
        explanation: "Geetanjali Shree's 'Tomb of Sand' became the first Hindi novel to win the International Booker Prize (2022)."
    }
];
