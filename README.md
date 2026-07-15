# Orange Pixel Lab

一个可部署的静态个人技术主页：像素风作品集、自动同步的 Markdown 笔记目录，以及可直达的 Markdown 阅读页。

## 本地开发

```bash
npm install
npm run dev
```

## 生产构建

```bash
npm run build
npm run preview
```

构建会先从 `resource/note/` 同步全部 `.md` 文件到发布目录，并生成 `notes-manifest.json`。因此新增、修改或删除笔记后，只需再次执行 `npm run build`。

## 部署

Vercel 的构建命令使用 `npm run build`，输出目录填写 `dist`。
