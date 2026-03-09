# Standard Operating Procedure (SOP): PDF to Interactive Question Bank Conversion

## 1. Overview
This document outlines the systematic process for converting static PDF exam papers into the interactive JSON format used by the CUET application. Following this SOP ensures data integrity, correct rendering of symbols, and high-quality visual assets.

## 2. Prerequisites
- **Node.js** installed on the machine.
- Access to the raw PDF or converted text file (e.g., `pdftotext -layout` output).
- The `scripts/` directory containing the following utilities:
  - `parse_questions.js`
  - `fix_symbols.js`
  - `add_source_metadata.js`
  - `enrich_questions.js`

---

## 3. Conversion Workflow

### Batch Processing Standard
**Critical:** To ensure accuracy and manageability, all conversion and verification tasks must be performed in **batches of 10 questions** (e.g., Q1-10, Q11-20).
- **Process:** Update 10 questions -> Verify in Browser -> Commit.
- **Why:** This prevents cascading errors and makes manual review less overwhelming.

### Phase 1: Text Extraction & Parsing
**Objective:** Convert raw text into structured JSON.
1.  **Input Preparation**: Place the text file in a known location (e.g., `CUET UG/Sample-papers/`).
2.  **Run Parsing Script**:
    ```bash
    node scripts/parse_questions.js
    ```
    *Logic:* This script identifies question blocks (`1. ...`) and separates options. **CRITICAL:** It must strictly filter for **English-only pages** (typically found on even indices like Page 2, 4...) and ignore regional language pages (e.g., Assamese, Hindi) to prevent duplicate or garbled data.
3.  **Output**: Generates `cuet-app/src/data/questions.json`.

### Phase 2: Data Cleaning & Symbol Repair
**Objective:** Fix encoding errors and broken math symbols.
1.  **Identify Issues**: Scan the visual output for boxes or invalid characters (e.g., `` instead of `÷`).
2.  **Run Fix Script**:
    ```bash
    node scripts/fix_symbols.js
    ```
    *Logic:* Replaces known corrupt unicode sequences with standard mathematical symbols.

### Phase 3: Metadata & Enrichment
**Objective:** Add "intelligence" to the raw data.
1.  **Source Tracking**: Tag questions with their origin file.
    ```bash
    node scripts/add_source_metadata.js
    ```
    *Result:* Adds `"source": "CUET-GAT-2024"` to each question object.
2.  **Logic Injection**: Add answers and explanations.
    ```bash
    node scripts/enrich_questions.js
    ```
    *Result:* Populates `correctAnswerIndex` and `explanation` fields.
3.  **Syllabus Alignment**:
    - Refer to the subject-specific syllabus files in `CUET UG/Syllbus/` (e.g., `CUET-ACC-syllabus.pdf`) to ensure explanations align with the official curriculum.
    - Tag questions with relevant topics if the schema allows.

### Phase 4: Visual Reconstruction (SVG)
**Objective:** Replace missing images with high-fidelity vector graphics.
1.  **Identify Visual Questions**: flag questions with `isFigure: true`.
2.  **Create Assets**:
    - Do NOT use screenshots (they blur).
    - create **SVG files** in `public/assets/` named `q{id}.svg`.
    - Use `<g>` groups for distinct boxes to effectively handle layout and spacing.
    - Ensure font consistency (Arial, consistent stroke widths).

### Phase 5: Verification
1.  **Browser Check**:
    - Verify strict 1:1 match with original PDF text.
    - Check formatting of explanations (Markdown support).
    - Ensure tracking tags are visible.
2.  **Mobile Responsiveness**: Test on mobile viewports (e.g., 390x844) to ensure no horizontal scroll or background cutoff.

---

## 4. Maintenance & Extensions
- **Adding New Papers**: Update `inputFile` path in `parse_questions.js` and run the pipeline.
- **AI Generation**: To generate new questions, use `add_ai_questions.js` which can append synthetically generated questions with `source: "AI_GENERATED"`.

---

## 5. Data Format & Modularisation Standards

To ensure long-term maintainability as the question bank grows, adhere to the following standards:

### A. Strict Data Schema
All question entries in `questions.json` must strictly follow the TypeScript interface defined in the application:

```typescript
interface Question {
  id: number;                // Unique incremental Integer
  text: string;              // Question body (Markdown supported)
  options: string[];         // Exact array of 4 string options
  isFigure: boolean;         // True if question requires visual asset
  correctAnswerIndex?: number; // 0-3 index
  explanation?: string;      // Detailed markdown explanation
  source?: string;           // Origin tracking tag (e.g., "CUET-GAT-2024")
}
```

### B. Modularisation Strategy
As the dataset expands to include multiple subjects (Accountancy, Business Studies, Economics, English, General Test), do not keep everything in a single `questions.json` file.

1.  **File Splitting**: Split data by **Subject** and **Year** into separate files in `src/data/`:
    *   `src/data/questions_accountancy_2022.json`
    *   `src/data/questions_business_studies_2023.json`
    *   `src/data/questions_economics_2024.json`
    *   `src/data/questions_english_2022.json`
    *   `src/data/questions_gat_2022.json` (General Aptitude Test)
    
2.  **Aggregation**: Use `src/data/index.ts` to import and combine these into a unified structure or export them as distinct collections.
    ```typescript
    import acc22 from './questions_accountancy_2022.json';
    import bs23 from './questions_business_studies_2023.json';
    
    export const questionsBySubject = {
      accountancy: [...acc22],
      businessStudies: [...bs23],
      // ...
    };
    ```

### C. Asset Organisation
*   **Naming Convention**: `q{id}.svg` (e.g., `q101.svg`).
*   **Directory Structure**: Create subfolders for each subject to prevent ID collisions and maintain order:
    *   `public/assets/accountancy/`
    *   `public/assets/business_studies/`
    *   `public/assets/economics/`
    *   `public/assets/english/`
    *   `public/assets/gat/`

### D. Separation of Concerns
*   **Scripts**: Extraction logic (`scripts/`) must remain separate from application code (`src/`).
*   **UI Components**: `QuestionCard.tsx` should only handle rendering. Business logic (scoring, filtering) should reside in `App.tsx` or custom hooks.

---

## 6. Troubleshooting

### Text Extraction Failed (Empty output)
If `parse_questions.js` or the extraction script returns 0 questions or empty text:
1.  **Check for Scanned PDF**: Open the PDF and try to select text. If you cannot, it is an image/scan.
2.  **Solution**: You must use **OCR (Optical Character Recognition)** software (e.g., Adobe Acrobat Pro, Tesseract, or online converters) to convert the PDF to a searchable PDF or text file before processing.

