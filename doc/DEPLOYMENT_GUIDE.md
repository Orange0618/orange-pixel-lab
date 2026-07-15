# 个人网站部署方案

> 适用对象：希望搭建个人主页并长期发布 Markdown 技术笔记的计算机专业研究生。  
> 目标：**不租用服务器**，通过 GitHub 保存内容、Vercel 自动构建并发布网站。

## 1. 方案概览

推荐采用以下静态部署架构：

```text
个人主页与 Markdown 笔记
        ↓ Git push
GitHub 仓库（代码、图片、Markdown 原文、版本历史）
        ↓ 自动触发构建
Vercel（静态托管、HTTPS、预览部署）
        ↓
个人域名或 *.vercel.app 地址
```

技术组成：

| 用途 | 推荐技术 |
| --- | --- |
| 个人主页 | Vue 3 + TypeScript + Vite |
| 技术笔记 | VitePress + Markdown |
| 源码与文章存储 | GitHub |
| 自动部署与静态托管 | Vercel |
| 自定义域名（可选） | 域名注册商 + Vercel DNS 配置 |

这是一套纯静态方案：GitHub 保存源文件，Vercel 构建并公开网站。它不需要维护 Linux 服务器、Nginx、数据库、防火墙或 HTTPS 证书。

## 2. 为什么选择这套方案

该方案适合以下需求：

- 个人主页以展示个人介绍、研究方向、项目经历、简历和联系方式为主；
- 技术笔记以 `.md` 文件持续维护；
- 需要代码高亮、公式、目录、图片和 Mermaid 图表；
- 网站主要由本人维护，不需要访客注册、评论或在线投稿；
- 希望每次更新后自动发布，并且保留文章修改历史。

Git 的提交历史本身就是文章版本记录。写错内容或误删文件时，可以通过 GitHub/Git 回退到历史版本。

## 3. 推荐的目录与部署组织

建议使用**一个 GitHub 仓库、两个独立站点**的结构：主页和笔记共用同一个仓库，但分别由 Vercel 构建。这样仍然只需要维护一份代码库，同时避免把 Vue 应用和 VitePress 的构建产物强行混在一起。

```text
personal-website/
├─ apps/
│  ├─ homepage/                 # Vue 3 + Vite 个人主页
│  │  ├─ src/
│  │  ├─ public/
│  │  ├─ package.json
│  │  └─ vite.config.ts
│  └─ notes/                    # VitePress 技术笔记站
│     ├─ .vitepress/
│     ├─ analog/
│     ├─ embedded/
│     ├─ fpga/
│     ├─ iot/
│     ├─ research/
│     ├─ index.md
│     └─ package.json
├─ package.json                  # 可选：统一管理工作区依赖
├─ .gitignore
└─ README.md
```

推荐访问地址：

```text
https://你的域名/              # 个人主页
https://notes.你的域名/        # 技术笔记
```

如果暂时没有域名，可先使用 Vercel 分配的地址：

```text
https://personal-homepage.vercel.app
https://personal-notes.vercel.app
```

> 说明：将主页与笔记拆为两个 Vercel 项目，不代表需要两个仓库或两台服务器；二者都可以指向同一 GitHub 仓库的不同目录。

## 4. Markdown 笔记工作流

每篇笔记都是仓库中的普通 Markdown 文件，例如：

```text
apps/notes/
├─ embedded/stm32-timer.md
├─ iot/lora-system.md
├─ iot/wisp-overview.md
└─ analog/transistor.md
```

建议为文章增加 Frontmatter，便于后续生成分类、标签、时间线和搜索：

```markdown
---
title: WISP 反向散射通信原理
date: 2026-07-15
category: 无源物联网
tags:
  - WISP
  - RFID
  - Backscatter
description: 介绍 Reader 与 WISP 之间的供能、下行通信和反向散射流程。
---

# WISP 反向散射通信原理

正文内容……
```

发布一篇笔记的流程：

```text
本地新建或修改 .md 文件
        ↓
本地预览并检查格式
        ↓
git add / commit / push
        ↓
Vercel 自动构建
        ↓
线上笔记自动更新
```

常用命令：

```powershell
git add .
git commit -m "新增 WISP 反向散射笔记"
git push
```

也可以直接在 GitHub 网页中创建或编辑 Markdown 文件并提交；提交后同样会触发 Vercel 部署。

## 5. 第一次部署步骤

### 5.1 本地准备

在项目根目录安装依赖，并分别确认两个站点均能正常构建：

```powershell
# 个人主页
cd apps/homepage
npm install
npm run build

# 技术笔记
cd ../notes
npm install
npm run docs:build
```

常见脚本配置：

```json
{
  "scripts": {
    "dev": "vitepress dev .",
    "docs:build": "vitepress build .",
    "docs:preview": "vitepress preview ."
  }
}
```

构建成功后，常见输出目录为：

```text
主页：apps/homepage/dist
笔记：apps/notes/.vitepress/dist
```

本地预览生产构建：

```powershell
# 在对应项目目录执行
npm run preview
```

VitePress 项目可使用：

```powershell
npm run docs:preview
```

### 5.2 初始化并推送 GitHub

确认 `.gitignore` 至少包含以下内容：

```gitignore
node_modules
dist
.vitepress/dist
.env
.env.local
.DS_Store
```

然后在仓库根目录执行：

```powershell
git init
git add .
git commit -m "Initial personal website"
git branch -M main
git remote add origin https://github.com/你的用户名/personal-website.git
git push -u origin main
```

在 GitHub 新建仓库时，建议不要预先生成 README、`.gitignore` 或许可证文件，以避免首次推送产生历史冲突。

### 5.3 在 Vercel 部署个人主页

1. 使用 GitHub 账号登录 Vercel。
2. 选择 **Add New → Project**，导入 `personal-website` 仓库。
3. 设置 **Root Directory** 为 `apps/homepage`。
4. 确认构建配置：

```text
Framework Preset: Vite
Install Command: npm install
Build Command: npm run build
Output Directory: dist
```

5. 点击 **Deploy**。

部署完成后，Vercel 会提供一个 `*.vercel.app` 测试地址。

### 5.4 在 Vercel 部署技术笔记

再次创建一个 Vercel 项目，仍然选择同一个 GitHub 仓库，但设置：

```text
Root Directory: apps/notes
Install Command: npm install
Build Command: npm run docs:build
Output Directory: .vitepress/dist
```

部署完成后，笔记站会获得独立的 `*.vercel.app` 地址。

## 6. 域名与 HTTPS（可选）

网站稳定后再购买域名即可。在 Vercel 对应项目中进入：

```text
Settings → Domains → Add Domain
```

推荐绑定方式：

| 站点 | 域名示例 |
| --- | --- |
| 个人主页 | `yourname.com` |
| 技术笔记 | `notes.yourname.com` |

Vercel 会显示需要在域名服务商处添加的 DNS 记录（通常是 A 记录或 CNAME 记录）。按提示配置并等待验证完成后，Vercel 会自动配置 HTTPS 证书。

## 7. 后续更新流程

日常更新无需手动上传 `dist` 文件：

```text
修改主页代码或 Markdown 笔记
        ↓
本地运行/构建检查
        ↓
git push 到 main
        ↓
Vercel 自动重新部署生产站点
```

建议每次更新前至少执行相关项目的构建命令，避免把无法构建的版本推送到线上：

```powershell
# 主页变更后
cd apps/homepage
npm run build

# 笔记变更后
cd ../notes
npm run docs:build
```

## 8. 环境变量与安全注意事项

如果主页需要读取公开配置，可使用 Vite 环境变量：

```env
VITE_API_BASE_URL=https://api.example.com
```

在 Vercel 项目中通过以下位置配置对应值：

```text
Settings → Environment Variables
```

`VITE_` 前缀的变量会被编译进浏览器代码，因此**不能**存放密码、数据库连接串、私有 API Key 或对象存储密钥。

```env
# 错误：这些内容会暴露给访问者
VITE_DATABASE_PASSWORD=secret
VITE_PRIVATE_API_KEY=secret
```

个人主页的公开仓库中也不应提交 `.env`、私钥、访问令牌、个人手机号或详细家庭地址。

## 9. 该方案的边界

纯静态方案可以实现：

- Markdown 渲染与发布；
- 图片、公式、代码高亮、目录和 Mermaid 图表；
- Git 版本管理；
- 自动部署和 HTTPS；
- 免费或低成本的长期维护。

它不适合直接实现：

- 在网站后台登录后上传 Markdown 并立即发布；
- 多用户评论、注册、权限管理；
- 数据库驱动的动态内容；
- 私密笔记和复杂全文检索。

这些需求出现后，再按需增加身份认证、Serverless API、对象存储和数据库；不必在第一版网站中预先实现。

## 10. 最终建议

第一版应优先完成内容与稳定的发布流程：

```text
Vue 3 + Vite 个人主页
        +
VitePress Markdown 技术笔记
        +
GitHub 版本管理
        +
Vercel 自动部署
```

核心维护方式很简单：

> 写 Markdown → 提交 Git → 自动部署。

这套方案足以支撑研究生阶段的个人展示、项目作品集和长期技术笔记积累，同时保留以后扩展成在线管理后台的空间。
