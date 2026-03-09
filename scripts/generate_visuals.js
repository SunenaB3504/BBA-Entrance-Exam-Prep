import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, '../public/assets/images/challenge');

const q1Svg = `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="200" height="200" fill="white" stroke="black" stroke-width="2"/><circle cx="50" cy="50" r="10" fill="black"/><text x="40" y="160" font-size="30">?</text></svg>`;
const q2Svg = `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="200" height="200" fill="white" stroke="black" stroke-width="2"/><text x="10" y="100" font-size="20">?</text></svg>`;
const q3Svg = `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="200" height="200" fill="white" stroke="black" stroke-width="2"/><text x="100" y="140" font-size="30">?</text></svg>`;
const q4Svg = `<svg width="200" height="100" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="200" height="100" fill="white" stroke="black"/><text x="150" y="50" font-size="30">?</text></svg>`;
const q5Svg = `<svg width="200" height="100" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="200" height="100" fill="white" stroke="black"/><text x="90" y="50" font-size="20">-&gt;</text></svg>`;

const images = [q1Svg, q2Svg, q3Svg, q4Svg, q5Svg];

images.forEach((svg, i) => {
    fs.writeFileSync(path.join(dir, `q${i + 1}.png`), svg);
});
console.log('SVGs created');
