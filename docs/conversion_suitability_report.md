
# Conversion Suitability Report
**Date:** 2026-01-20

Based on the analysis of PDF files in `CUET UG\Sample-papers\Frm NAT Site`, the following files are suitable for the **Text Conversion** workflow outlined in `SOP_PDF_to_Questions.md`.

## ✅ Suitable for Conversion (Text-Based)
These files have accessible text layers and can be processed using `scripts/parse_questions.js`.

| Subject | Year | Filename | Text Quality |
| :--- | :--- | :--- | :--- |
| **Accountancy** | 2022 | `CUET-ACC-2022.pdf` | Good (Requires extraction script) |
| **Accountancy** | 2024 | `CUET-ACC-2024.pdf` | Excellent |
| **Business Studies** | 2022 | `CUET-BS-2022.pdf` | Good |
| **Business Studies** | 2024 | `CUET-BS-2024.pdf` | Excellent |
| **Economics** | 2022 | `CUET-ECO-2022.pdf` | Good |
| **Economics** | 2023 | `CUET-ECO-2023.pdf` | Moderate (Different layout) |
| **Economics** | 2024 | `CUET-ECO-2024.pdf` | Excellent |
| **English** | 2022 | `CUET-ENG-2022.pdf` | Good |
| **English** | 2024 | `CUET-ENG-2024.pdf` | Excellent |
| **General Test** | 2022 | `CUET-GAT-2022.pdf` | Good |
| **General Test** | 2024 | `CUET-GAT-2024.pdf` | Excellent |
| **Physical Education** | 2022 | `CUET-PE-2022.pdf` | Good |
| **Physical Education** | 2024 | `CUET-PE-2024.pdf` | Excellent |

## ⚠️ Unsuitable for Standard Pipeline (Requires OCR)
These files appear to be scanned images. They require an OCR step (e.g., using Adobe Acrobat or `tesseract`) before they can be processed by the SOP's scripts.

| Subject | Year | Filename | Status |
| :--- | :--- | :--- | :--- |
| **Accountancy** | 2023 | `CUET-ACC-2023.pdf` | ❌ Scanned Image |
| **Business Studies** | 2023 | `CUET-BS-2023.pdf` | ❌ Scanned Image |
| **English** | 2023 | `CUET-ENG-2023.pdf` | ❌ Scanned Image |
| **General Test** | 2023 | `CUET-GAT-2023.pdf` | ❌ Scanned Image |
| **Physical Education** | 2023 | `CUET-PE-2023.pdf` | ❌ Scanned Image |

## Recommended Next Steps
1.  **Prioritize:** Start with the **2024** series for all subjects as they have the best text quality (`Excellent`).
2.  **Process 2022:** Follow up with 2022 series (Text Quality `Good`).
3.  **OCR Pipeline:** Set up an OCR workflow for the 2023 papers separately.
