const fs = require('fs');
const path = require('path');

const directory = './';

const replacements = [
  { regex: /bg-\[\#111\]/g, replacement: 'bg-card' },
  { regex: /bg-\[\#0a0a0a\]/g, replacement: 'bg-card' },
  { regex: /bg-\[\#050505\]/g, replacement: 'bg-card' },
  { regex: /border-white\/5/g, replacement: 'border-border' },
  { regex: /border-white\/10/g, replacement: 'border-border' },
  { regex: /border-white\/20/g, replacement: 'border-border' },
  { regex: /border-white\/30/g, replacement: 'border-border' },
  { regex: /bg-white\/5/g, replacement: 'bg-card' },
  { regex: /bg-white\/10/g, replacement: 'bg-border' },
  { regex: /bg-white\/20/g, replacement: 'bg-border' },
  // specific replacements
  { regex: /shadow-\[0_0_15px_rgba\(255,191,0,0\.4\)\]/g, replacement: 'shadow-[0_0_15px_rgba(26,107,71,0.4)]' }
];

const walkSync = (dir, filelist = []) => {
  if (!fs.existsSync(dir)) return filelist;
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      if (!dirFile.includes('node_modules') && !dirFile.includes('.next') && !dirFile.includes('.git')) {
        filelist = walkSync(dirFile, filelist);
      }
    } else {
      if (dirFile.endsWith('.tsx') || dirFile.endsWith('.ts') || dirFile.endsWith('.jsx') || dirFile.endsWith('.js')) {
        filelist.push(dirFile);
      }
    }
  });
  return filelist;
};

const files = walkSync(directory);
let modifiedFiles = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  replacements.forEach(({ regex, replacement }) => {
    content = content.replace(regex, replacement);
  });
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Modified: ${file}`);
    modifiedFiles++;
  }
});

console.log(`Done. Modified ${modifiedFiles} files.`);
