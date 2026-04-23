import fs from 'fs';
import path from 'path';

const linkHtml = `
    <a class="flex items-center space-x-3 text-on-surface-variant hover:text-primary pl-4 py-3 hover:bg-surface-container-high rounded-l-lg transition-all duration-300" href="/saved" data-link>
      <span class="material-symbols-outlined text-xl" data-icon="bookmark">bookmark</span>
      <span class="font-label font-semibold tracking-wide text-sm">Saved</span>
    </a>`;

// Just insert the link after Archives link.
const dir = './src/pages';
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.endsWith('.ts') && !['landing.ts', 'login.ts', 'register.ts'].includes(file)) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // We look for the Archives link block closing tag `</a>` and insert our link there.
    // However, the active class might be different per file.
    let re = /(<a[^>]*href="\/archives"[^>]*>[\s\S]*?<\/a>)/;
    if (content.match(re)) {
      content = content.replace(re, `$1\n${linkHtml}`);
      fs.writeFileSync(filePath, content);
      console.log('Updated ' + file);
    }
  }
});
