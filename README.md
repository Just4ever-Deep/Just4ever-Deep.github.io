# THE MACHINE LOG

A Hexo blog project for research notes, paper reading, course records, and engineering logs.

## Project Structure

```txt
.
├─ _config.yml                        # Hexo root config (site-level)
├─ package.json
├─ scaffolds/                         # hexo new templates
├─ source/
│  ├─ _posts/                         # blog posts
│  ├─ about/index.md                  # About page
│  ├─ search/index.md                 # Search page
│  ├─ categories/index.md             # Categories index
│  ├─ tags/index.md                   # Tags index
│  ├─ archives/index.md               # Archives index
│  └─ 404.md
├─ themes/the-machine-log/
│  ├─ _config.yml                     # theme config (menu/profile/features)
│  ├─ layout/
│  └─ source/{css,js,images}
└─ docs/USAGE-FAQ.md
```

## Dependencies

Installed key packages:

- hexo / hexo-cli / hexo-server
- hexo-renderer-ejs
- hexo-renderer-marked
- hexo-renderer-stylus
- hexo-generator-searchdb
- hexo-filter-mathjax
- hexo-generator-feed
- hexo-generator-sitemap
- hexo-abbrlink
- hexo-deployer-git

## Local Run

```bash
npm install
npx hexo clean
npx hexo generate
npx hexo server
```

Visit: `http://localhost:4000`

## How to Write a New Post

```bash
npx hexo new post "your-title"
```

Then edit file in `source/_posts/your-title.md`.

## How to Modify Personal Information

- Site-wide info: edit root `_config.yml`
- Theme profile/menu/social/features: edit `themes/the-machine-log/_config.yml`

## Writing Workflow

1. `npx hexo new post "topic"`
2. Fill front matter (`categories`, `tags`, `status`, `summary`)
3. Write content (supports TOC / MathJax / Mermaid / code copy)
4. Preview with `npx hexo server`

## Post Front Matter

```yaml
---
title: Your Title
date: 2026-04-28 10:00:00
updated: 2026-04-28 10:00:00
categories:
  - Research Log
tags:
  - experiment
status: active
summary: Short abstract.
---
```

`status` options: `active`, `archived`, `research`, `draft`

## Theme Configuration

Main theme options are in `themes/the-machine-log/_config.yml`:

- `menu`
- `social`
- `profile`
- `features` (`search`, `toc`, `code_copy`, `mermaid`, `math`, `rss`)

## Deployment

### GitHub Pages (gh-pages branch)

1. Ensure `_config.yml` has correct `deploy.repo`
2. Run:

```bash
npm run build
npm run deploy
```

If first deployment fails authentication, run GitHub login in your shell first.

## Customization

- Theme styles: `themes/the-machine-log/source/css/*.styl`
- Theme scripts: `themes/the-machine-log/source/js/*.js`
- Layout templates: `themes/the-machine-log/layout/**/*.ejs`
- Content pages/posts: `source/**`

## License

MIT
