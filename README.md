# THE MACHINE LOG

A Hexo-powered personal research blog for notes, paper reading, course records, and engineering logs.

## Project Structure

```txt
.
|-- _config.yml
|-- package.json
|-- scaffolds/
|-- source/
|   |-- _posts/
|   |-- about/
|   |-- archives/
|   |-- categories/
|   |-- search/
|   `-- tags/
|-- themes/the-machine-log/
|   |-- _config.yml
|   |-- layout/
|   `-- source/
`-- docs/
```

## Local Development

```bash
npm install
npm run clean
npm run build
npm run server
```

Local preview: `http://localhost:4000`

## Write a New Post

```bash
npx hexo new post "your-title"
```

Then edit the generated file in `source/_posts/`.

## GitHub Pages Deployment

This repository is configured for GitHub Pages through GitHub Actions.

1. Push the repository to `https://github.com/Just4ever-Deep/Just4ever-Deep.github.io`.
2. In GitHub, open `Settings -> Pages`.
3. Set `Build and deployment -> Source` to `GitHub Actions`.
4. Push to the `main` branch.

The workflow in `.github/workflows/pages.yml` will install dependencies, run `npm run build`, upload `public/`, and publish the site to:

```txt
https://just4ever-deep.github.io/
```

## Manual Deployment Option

If you prefer Hexo's git deployer, run:

```bash
npm run build
npm run deploy
```

The deploy target is configured in `_config.yml`.
