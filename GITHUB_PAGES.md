# GitHub Pages 部署

将本文件所在目录中的 `index.html`、`sw.js`、`manifest.webmanifest` 和 `.nojekyll` 上传到站点根目录。直接部署这四个文件即可，不需要额外字体、图片、API 或构建环境。

首次联网打开后，Service Worker 会缓存 `jlpt-n1-q7-v2-r1`。以后更新：

1. 修改 `questions.json` 或页面源码；
2. 运行 `ruby build.rb`；
3. 同时提交新的 `index.html` 与 `sw.js`；
4. 确认 `sw.js` 中的缓存名是本次发布唯一值 `jlpt-n1-q7-v2-r1`。

离线 HTML 使用 `分享版/JLPT_N1_Q7_v2.html`，不需要 Service Worker。
