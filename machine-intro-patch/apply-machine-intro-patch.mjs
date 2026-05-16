#!/usr/bin/env node
/**
 * Machine Intro Patch Applier for Hexo theme: the-machine-log
 *
 * Usage:
 *   node apply-machine-intro-patch.mjs /path/to/your/hexo-project
 *
 * What it does:
 *   1. Adds machine-intro.ejs, machine-intro.styl, machine-intro.js, and SVG backgrounds.
 *   2. Inserts the intro partial right after <body> in layout.ejs.
 *   3. Imports machine-intro.styl from source/css/main.styl.
 *   4. Loads machine-intro.js from layout/partial/scripts.ejs.
 */

import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(process.argv[2] || process.cwd());
const packageRoot = path.dirname(new URL(import.meta.url).pathname);
const filesRoot = path.join(packageRoot, "files");

const themeRoot = path.join(projectRoot, "themes", "the-machine-log");
const requiredFiles = [
  path.join(themeRoot, "layout", "layout.ejs"),
  path.join(themeRoot, "layout", "partial", "scripts.ejs"),
  path.join(themeRoot, "source", "css", "main.styl")
];

function fail(message) {
  console.error(`\n[Machine Intro Patch] ${message}\n`);
  process.exit(1);
}

if (!fs.existsSync(themeRoot)) {
  fail(`Theme folder not found: ${themeRoot}`);
}

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) {
    fail(`Required file not found: ${file}`);
  }
}

function copyRecursive(source, target) {
  const stat = fs.statSync(source);
  if (stat.isDirectory()) {
    fs.mkdirSync(target, { recursive: true });
    for (const entry of fs.readdirSync(source)) {
      copyRecursive(path.join(source, entry), path.join(target, entry));
    }
    return;
  }
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
}

copyRecursive(path.join(filesRoot, "themes", "the-machine-log"), themeRoot);

function patchFile(file, updater) {
  const original = fs.readFileSync(file, "utf8");
  const updated = updater(original);
  if (updated !== original) {
    fs.writeFileSync(file, updated, "utf8");
    console.log(`[patched] ${path.relative(projectRoot, file)}`);
  } else {
    console.log(`[unchanged] ${path.relative(projectRoot, file)}`);
  }
}

patchFile(path.join(themeRoot, "layout", "layout.ejs"), (content) => {
  if (content.includes("partial('partial/machine-intro')") || content.includes('partial("partial/machine-intro")')) {
    return content;
  }

  const bodyOpen = /<body([^>]*)>/i;
  if (!bodyOpen.test(content)) {
    fail("Could not find <body> in layout.ejs. Add this manually after <body>: <%- partial('partial/machine-intro') %>");
  }

  return content.replace(bodyOpen, (match) => `${match}\n  <%- partial('partial/machine-intro') %>`);
});

patchFile(path.join(themeRoot, "source", "css", "main.styl"), (content) => {
  if (content.includes('@import "machine-intro"') || content.includes("@import 'machine-intro'")) {
    return content;
  }
  return `${content.trimEnd()}\n@import "machine-intro"\n`;
});

patchFile(path.join(themeRoot, "layout", "partial", "scripts.ejs"), (content) => {
  if (content.includes("/js/machine-intro.js") || content.includes("machine-intro.js")) {
    return content;
  }

  const scriptLine = `<%- js('/js/machine-intro.js') %>`;

  if (content.includes("</body>")) {
    return content.replace("</body>", `${scriptLine}\n</body>`);
  }

  return `${content.trimEnd()}\n${scriptLine}\n`;
});

console.log("\n[Machine Intro Patch] Done.");
console.log("Run: npx hexo clean && npx hexo generate && npx hexo server");
console.log("Tip: add ?intro to any page URL to replay the intro during testing.");
