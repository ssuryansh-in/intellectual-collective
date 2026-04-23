import fs from 'fs';
import { fetchSavedLogic } from './saved_logic.ts';

let mainContent = fs.readFileSync('src/main.ts', 'utf-8');
mainContent = mainContent.replace('  // Settings Logic', fetchSavedLogic + '\n\n  // Settings Logic');
fs.writeFileSync('src/main.ts', mainContent);
