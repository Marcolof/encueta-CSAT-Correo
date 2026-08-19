// Conversor Markdown -> HTML minimalista, sin dependencias externas.
// Cubre lo que usan los docs del proyecto: headings, bold/italic, inline code,
// code fences, tablas, blockquotes, listas (con un nivel de anidado), hr, links, párrafos.
const fs = require('fs');
const path = require('path');

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function inline(text) {
  let s = escapeHtml(text);
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>');
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  return s;
}

function renderTable(lines) {
  const rows = lines.filter(l => !/^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)*\|?\s*$/.test(l));
  const cells = rows.map(l => l.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim()));
  const [head, ...body] = cells;
  let html = '<div class="doc-table-wrap"><table><thead><tr>';
  head.forEach(h => html += `<th>${inline(h)}</th>`);
  html += '</tr></thead><tbody>';
  body.forEach(r => {
    html += '<tr>';
    r.forEach(c => html += `<td>${inline(c)}</td>`);
    html += '</tr>';
  });
  html += '</tbody></table></div>';
  return html;
}

function mdToHtml(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  let html = '';
  let i = 0;
  let listStack = []; // {type, indent}

  function closeLists(toIndent = -1) {
    while (listStack.length && listStack[listStack.length - 1].indent > toIndent) {
      html += listStack.pop().type === 'ol' ? '</ol>' : '</ul>';
    }
  }

  while (i < lines.length) {
    const line = lines[i];

    // Code fence
    if (/^```/.test(line)) {
      closeLists();
      const lang = line.replace(/^```/, '').trim();
      let code = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i])) { code.push(lines[i]); i++; }
      i++;
      html += `<pre class="doc-code"><code${lang ? ` class="lang-${lang}"` : ''}>${escapeHtml(code.join('\n'))}</code></pre>`;
      continue;
    }

    // Table
    if (/^\s*\|/.test(line) && i + 1 < lines.length && /^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)*\|?\s*$/.test(lines[i + 1])) {
      closeLists();
      let tbl = [line];
      i++;
      while (i < lines.length && /^\s*\|/.test(lines[i])) { tbl.push(lines[i]); i++; }
      html += renderTable(tbl);
      continue;
    }

    // Heading
    let m = line.match(/^(#{1,4})\s+(.*)$/);
    if (m) {
      closeLists();
      const level = m[1].length;
      html += `<h${level}>${inline(m[2].trim())}</h${level}>`;
      i++; continue;
    }

    // Horizontal rule
    if (/^\s*---+\s*$/.test(line)) {
      closeLists();
      html += '<hr/>';
      i++; continue;
    }

    // Blockquote
    if (/^>\s?/.test(line)) {
      closeLists();
      let quote = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) { quote.push(lines[i].replace(/^>\s?/, '')); i++; }
      html += `<blockquote>${inline(quote.join(' '))}</blockquote>`;
      continue;
    }

    // List item (ordered or unordered), tracking indent for one nested level
    let lm = line.match(/^(\s*)([-*])\s+(.*)$/) || line.match(/^(\s*)(\d+)\.\s+(.*)$/);
    if (lm) {
      const indent = lm[1].length;
      const isOrdered = /^\d+$/.test(lm[2]);
      const type = isOrdered ? 'ol' : 'ul';
      closeLists(indent);
      if (!listStack.length || listStack[listStack.length - 1].indent < indent) {
        html += type === 'ol' ? '<ol>' : '<ul>';
        listStack.push({ type, indent });
      } else if (listStack[listStack.length - 1].type !== type) {
        html += listStack.pop().type === 'ol' ? '</ol>' : '</ul>';
        html += type === 'ol' ? '<ol>' : '<ul>';
        listStack.push({ type, indent });
      }
      html += `<li>${inline(lm[3])}</li>`;
      i++; continue;
    }

    // Blank line
    if (/^\s*$/.test(line)) { closeLists(); i++; continue; }

    // Paragraph (collect consecutive non-blank lines)
    closeLists();
    let para = [line];
    i++;
    while (i < lines.length && !/^\s*$/.test(lines[i]) && !/^(#{1,4})\s+/.test(lines[i]) && !/^\s*---+\s*$/.test(lines[i]) && !/^>\s?/.test(lines[i]) && !/^(\s*)([-*]|\d+\.)\s+/.test(lines[i]) && !/^```/.test(lines[i]) && !/^\s*\|/.test(lines[i])) {
      para.push(lines[i]); i++;
    }
    const paraHtml = para
      .map((l, idx) => idx < para.length - 1 && /  $/.test(l) ? inline(l) + '<br/>' : inline(l))
      .join(' ')
      .replace(/<br\/> /g, '<br/>');
    html += `<p>${paraHtml}</p>`;
  }
  closeLists();
  return html;
}

function firstH1(md) {
  const m = md.match(/^#\s+(.*)$/m);
  return m ? m[1].trim() : null;
}

const srcDir = path.resolve(__dirname, '..', 'Documents');
const outDir = path.resolve(__dirname, '..', 'hub', 'docs');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const template = fs.readFileSync(path.resolve(__dirname, 'doc-template.html'), 'utf8');

const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.md'));
const manifest = [];

for (const file of files) {
  const md = fs.readFileSync(path.join(srcDir, file), 'utf8');
  const body = mdToHtml(md);
  const title = firstH1(md) || file;
  const slug = file.replace(/\.md$/, '');
  const out = template
    .replace(/__TITLE__/g, title)
    .replace('__BODY__', body);
  fs.writeFileSync(path.join(outDir, slug + '.html'), out, 'utf8');
  manifest.push({ file, slug, title });
  console.log('OK', file, '->', slug + '.html');
}

fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
