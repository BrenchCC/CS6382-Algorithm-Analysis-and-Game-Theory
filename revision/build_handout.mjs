import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// Keep generated intermediates outside the editable handout sources.
const source = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(source, '..');
const work = path.join(repo, 'tmp/pdfs');
const tools = path.join(repo, '.cache/cs6382-handout-tools');
const output = path.join(source, 'output/pdf/CS6382_Assignment_1_Beginner_Revision_Handout.zh.pdf');
const figures = path.join(source, 'figures');
const vectorDir = path.join(work, 'figures');
fs.mkdirSync(vectorDir, { recursive: true });
fs.mkdirSync(path.dirname(output), { recursive: true });
function run(command, args, options = {}) {
  const result = spawnSync(command, args, { cwd: repo, encoding: 'utf8', ...options });
  if (result.error || result.status !== 0) {
    process.stderr.write(result.stdout || '');
    process.stderr.write(result.stderr || '');
    throw result.error || new Error(`${command} failed with exit code ${result.status}`);
  }
  return result.stdout;
}
const cli = path.join(tools, 'node_modules/@mermaid-js/mermaid-cli/src/cli.js');
if (!fs.existsSync(cli)) {
  console.log('Installing Mermaid CLI 12.0.0 into the repository cache.');
  run('npm', ['install', '--prefix', tools, '@mermaid-js/mermaid-cli@12.0.0'], {
    env: { ...process.env, PUPPETEER_SKIP_DOWNLOAD: 'true' },
  });
}
const chrome = process.env.HANDOUT_CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
if (!fs.existsSync(chrome)) throw new Error('Set HANDOUT_CHROME to an installed Chrome/Chromium executable.');
const puppeteerConfig = path.join(work, 'puppeteer.json');
const mermaidConfig = path.join(work, 'mermaid.json');
fs.writeFileSync(puppeteerConfig, JSON.stringify({ executablePath: chrome, args: ['--no-sandbox'] }));
fs.writeFileSync(mermaidConfig, JSON.stringify({
  theme: 'base', htmlLabels: false, fontFamily: 'PingFang SC', fontSize: 22,
  flowchart: { htmlLabels: false, curve: 'linear', nodeSpacing: 20, rankSpacing: 25, wrappingWidth: 380, padding: 12 },
  themeVariables: { fontFamily: 'PingFang SC', fontSize: '22px', primaryColor: '#eaf2f9', primaryBorderColor: '#245b91', primaryTextColor: '#203247', lineColor: '#536274' },
}));
run('node', [path.join(source, 'make_figures.mjs')]);
for (const name of fs.readdirSync(figures).filter(name => name.endsWith('.mmd')).sort()) {
  console.log(`Rendering ${name}`);
  run('node', [cli, '-i', path.join(figures, name), '-o', path.join(figures, name.replace(/\.mmd$/, '.svg')), '-c', mermaidConfig, '-p', puppeteerConfig, '-b', 'white']);
}
for (const name of fs.readdirSync(figures).filter(name => name.endsWith('.svg')).sort()) {
  const svgPath = path.join(figures, name);
  const svgText = fs.readFileSync(svgPath, 'utf8');
  if (!svgText.endsWith('\n')) fs.writeFileSync(svgPath, svgText + '\n');
  run('rsvg-convert', ['--format', 'pdf', '--output', path.join(vectorDir, name.replace(/\.svg$/, '.pdf')), path.join(figures, name)]);
}
const tex = path.join(work, 'handout.tex');
run('pandoc', [
  path.join(source, 'CS6382_Assignment_1_Beginner_Revision_Handout.zh.md'),
  '--from=markdown+raw_tex', '--to=latex', '--standalone', '--no-highlight',
  '--template', path.join(source, 'handout-template.tex'),
  '--lua-filter', path.join(source, 'handout-filter.lua'),
  '--resource-path', source, '--output', tex,
], { env: { ...process.env, HANDOUT_FIGURE_DIR: vectorDir } });
for (let pass = 1; pass <= 3; pass += 1) {
  console.log(`XeLaTeX pass ${pass}/3`);
  const log = run('xelatex', ['-interaction=nonstopmode', '-halt-on-error', '-file-line-error', 'handout.tex'], { cwd: work });
  fs.writeFileSync(path.join(work, `xelatex-pass-${pass}.txt`), log);
}
fs.copyFileSync(path.join(work, 'handout.pdf'), output);
console.log(run('pdfinfo', [output]));
console.log(`Created ${output}`);
