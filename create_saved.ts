import fs from 'fs';

let content = fs.readFileSync('src/pages/archives.ts', 'utf-8');

// Replace exports and text
content = content.replace('export function getArchivesContent() {', 'export function getSavedContent() {');
content = content.replace(/Archives/g, 'Saved Resources');

// Fix the active state in sidebar nav.
// Remove active classes from Archives link inside saved.ts:
content = content.replace(
  /<a class="flex items-center space-x-3 text-primary font-bold border-r-4 border-primary pl-4 py-3 bg-surface-container-high rounded-l-lg transition-all duration-300" href="\/archives" data-link>/,
  '<a class="flex items-center space-x-3 text-on-surface-variant hover:text-primary pl-4 py-3 hover:bg-surface-container-high rounded-l-lg transition-all duration-300" href="/archives" data-link>'
);

// Add active classes to Saved link inside saved.ts:
content = content.replace(
  /<a class="flex items-center space-x-3 text-on-surface-variant hover:text-primary pl-4 py-3 hover:bg-surface-container-high rounded-l-lg transition-all duration-300" href="\/saved" data-link>/,
  '<a class="flex items-center space-x-3 text-primary font-bold border-r-4 border-primary pl-4 py-3 bg-surface-container-high rounded-l-lg transition-all duration-300" href="/saved" data-link>'
);

// Fix IDs
content = content.replace(/archives-search-input/g, 'saved-search-input');
content = content.replace(/archives-list/g, 'saved-list');

fs.writeFileSync('src/pages/saved.ts', content);
