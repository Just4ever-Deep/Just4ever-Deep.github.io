# THE MACHINE LOG 使用指南（FAQ）

这个文档专门回答日常使用里最常见的问题：新文件放哪、改哪里、命令怎么跑。

## 1) 新文章放在哪个目录？

- 命令创建：`npx hexo new post "my-topic"`
- 文件位置：`source/_posts/my-topic.md`

你也可以直接新建 `.md` 到 `source/_posts/`，但推荐用命令生成，front matter 更规范。

## 2) 新页面放在哪个目录？

- 命令创建：`npx hexo new page "about-lab"`
- 目录位置：`source/about-lab/index.md`

Hexo 页面通常是“目录 + index.md”的结构。

## 3) 主题文件放在哪？

全部在：`themes/the-machine-log/`

- 布局模板：`layout/`
- 样式：`source/css/`
- 脚本：`source/js/`
- 主题配置：`_config.yml`

## 4) 根目录 `_config.yml` 和主题 `_config.yml` 有什么区别？

- 根 `_config.yml`：站点级配置（title、url、permalink、插件、deploy）
- 主题 `_config.yml`：主题级配置（菜单、个人信息、功能开关）

简单记忆：**站点行为改根配置，展示内容改主题配置**。

## 5) 常用命令

```bash
npm install
npx hexo clean
npx hexo generate
npx hexo server
```

- 清理缓存：`npx hexo clean`
- 生成静态站点：`npx hexo generate`
- 本地预览：`npx hexo server`

## 6) 怎么新增分类和标签？

直接在文章 front matter 里写：

```yaml
categories:
  - Systems
  - Engineering
tags:
  - distributed-system
  - database
```

Hexo 会自动汇总并更新分类/标签页面。

## 7) 搜索不工作怎么办？

先运行：

```bash
npx hexo clean && npx hexo generate
```

确认 `public/search.xml` 已生成，然后再 `npx hexo server`。

## 8) Mermaid / 数学公式不显示怎么办？

1. 检查主题功能开关（`themes/the-machine-log/_config.yml`）：
   - `features.mermaid: true`
   - `features.math: true`
2. 重新生成：`npx hexo clean && npx hexo generate`

## 9) 代码块复制按钮不出现怎么办？

确认主题开关：

```yaml
features:
  code_copy: true
```

并检查你是否使用了标准 Markdown 代码块（```lang）。

## 10) 如何部署到 GitHub Pages？

1. 在根 `_config.yml` 中配置：

```yaml
deploy:
  type: git
  repo: <your-repo-url>
  branch: gh-pages
```

2. 执行：

```bash
npm run build
npm run deploy
```

## 11) 日常推荐流程

1. `git pull`（如果有远端协作）
2. `npx hexo new post "topic"`
3. 写作 + 本地预览（`npx hexo server`）
4. `npx hexo generate` 检查构建
5. 提交 git

## 12) 我想改视觉风格，优先改哪些文件？

- 色彩变量：`themes/the-machine-log/source/css/variables.styl`
- 主布局样式：`themes/the-machine-log/source/css/main.styl`
- 移动端：`themes/the-machine-log/source/css/responsive.styl`

## 13) 我想新增一个功能脚本，放哪里？

放到 `themes/the-machine-log/source/js/`，然后在：

`themes/the-machine-log/layout/partial/scripts.ejs`

中引入。
