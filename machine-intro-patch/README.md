# Machine Intro Patch for `the-machine-log`

这个补丁给已有 Hexo 主题增加一个低侵入的开场启动层：扫描线、识别框、数据噪声、系统启动日志、自动关闭与 ESC / SKIP 跳过。

它是原创 HUD / 监控系统风格资产，不包含《疑犯追踪》的官方截图、Logo、剧照、台词或音效。

## 包含内容

```txt
files/
  themes/the-machine-log/
    layout/partial/machine-intro.ejs
    source/css/machine-intro.styl
    source/js/machine-intro.js
    source/images/
      machine-bg-grid.svg
      machine-bg-noise.svg
      machine-bg-nodes.svg
apply-machine-intro-patch.mjs
machine-intro.patch
```

## 推荐应用方式

在 Hexo 项目根目录外执行：

```bash
node apply-machine-intro-patch.mjs /path/to/your/hexo-project
```

或者把本目录放到 Hexo 项目根目录里执行：

```bash
node apply-machine-intro-patch.mjs .
```

然后运行：

```bash
npx hexo clean
npx hexo generate
npx hexo server
```

访问：

```txt
http://localhost:4000/?intro
```

加 `?intro` 可以强制重播开场动画，便于调试。

## 手动接入方式

如果你的文件结构和默认主题不完全一致，可以手动做这三处修改：

### 1. `themes/the-machine-log/layout/layout.ejs`

在 `<body>` 后面加入：

```ejs
<%- partial('partial/machine-intro') %>
```

### 2. `themes/the-machine-log/source/css/main.styl`

加入：

```stylus
@import "machine-intro"
```

### 3. `themes/the-machine-log/layout/partial/scripts.ejs`

加入：

```ejs
<%- js('/js/machine-intro.js') %>
```

再把 `files/themes/the-machine-log/...` 下的新增文件复制到你的主题目录即可。

## 行为说明

- 首次进入当前浏览器会话时显示启动动画。
- 同一浏览器会话内不会重复打扰阅读。
- `?intro` 可强制重播。
- ESC 或点击 `SKIP` 可立即跳过。
- 支持 `prefers-reduced-motion: reduce`，减少动效。
- 动画约 4 秒后自动关闭。

## 可调参数

在 `source/js/machine-intro.js` 中可以调整：

```js
const totalDuration = prefersReducedMotion ? 300 : 3900;
```

在 `source/css/machine-intro.styl` 中可以调整颜色、扫描速度、识别框位置和背景透明度。
