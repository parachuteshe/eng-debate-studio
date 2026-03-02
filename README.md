# Eng Debate Studio | 英辩训练室

支持 **Web 与手机端 H5** 的英辩训练站点，纯前端实现（数据存于 localStorage），便于扩展后端与 AI 接口。

## 功能概览

1. **辩手主页（需登录）**  
   展示辩论经验、证书/徽章、辩论好友；收藏的辩稿在个人主页可见。

2. **辩题推荐**  
   按年份、地区筛选，支持搜索；参考 [QatarDebate Motions Bank](https://www.qatardebate.org/en/page/motions/motions-bank)。

3. **赛事推荐**  
   示例数据含 Tabbycat 等赛事（如 WUDC 2025、NMDC 2025、Seasons Novice BP）；展示名称、地区、报名费与门槛；可扩展为从 Facebook/Ins/Tabbycat 抓取或对接 API。

4. **辩稿分享**  
   支持标题 + 来源 URL（如 YouTube，可扩展为抓 transcript）+ 直接粘贴/上传文本；用户可收藏，收藏列表在个人主页展示。

5. **专场训练（1v1 AI 对打）**  
   抽签正/反方 → 选辩题 → 30 分钟限时对打；支持语音输入（浏览器 SpeechRecognition）、回放为 transcript；结束由 AI 从逻辑性、严谨性等维度裁决（当前为模拟，可接 LLM API）。

6. **赛制训练（British Parliamentary）**  
   先抽签 slot（8 个角色：OG/OO/CG/CO 各 2 人）；公布辩题后 15 分钟准备；单人模式下 AI 扮演其余 7 人；邀请模式为 8 位真人登录后各自抽 slot（需后端房间与实时同步）。

## 使用方式

- 直接用浏览器打开 `index.html`，或使用任意静态服务器（如 `npx serve .`）在根目录运行。
- 登录：任意账号/密码即可（仅写 localStorage）；个人数据（经验、徽章、好友、收藏）均存于本地。

## 部署到 GitHub / GitHub Pages

1. 在 GitHub 新建仓库（如 `eng-debate-studio`），不要勾选 “Add a README”。
2. 本地在项目目录执行：
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Eng Debate Studio"
   git branch -M main
   git remote add origin https://github.com/你的用户名/eng-debate-studio.git
   git push -u origin main
   ```
3. 启用 GitHub Pages：仓库 → **Settings** → **Pages** → Source 选 **GitHub Actions** 或 **Deploy from a branch**，选 `main` 分支、`/ (root)`，保存后访问 `https://你的用户名.github.io/eng-debate-studio/`。

## 技术说明

- 单页应用，路由为 hash（`#/`, `#/login`, `#/profile`, `#/motions`, `#/tournaments`, `#/speeches`, `#/training/1v1`, `#/training/bp`）。
- 响应式布局与 H5 适配：`viewport-fit=cover`、`safe-area-inset`、移动端导航折叠。
- 语音：使用浏览器 `SpeechRecognition` / `webkitSpeechRecognition`（需 HTTPS 或 localhost）。
- 后续可做：接入真实辩题 API、赛事爬虫/API、YouTube transcript API、LLM 对打与评判、BP 8 人实时房间。

## 目录结构

```
eng-debate-studio/
├── index.html      # 单页入口
├── css/main.css    # 全局样式（Web + H5）
├── js/
│   ├── data.js     # 辩题/赛事/BP 角色等静态数据
│   ├── app.js      # 路由、登录、个人主页
│   ├── motions.js  # 辩题筛选与列表
│   ├── tournaments.js # 赛事筛选与列表
│   ├── speeches.js # 辩稿上传/URL/收藏
│   ├── training-1v1.js # 1v1 抽签、计时、语音、裁决
│   └── training-bp.js  # BP 抽签、准备计时、8 角色
└── README.md
```
