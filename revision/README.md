# 作业 1 复习讲义源文件

本目录保留中文讲义、图形生成器和 PDF 构建脚本。正文覆盖全部六题、27 个小问，图示紧邻对应解释；自测答案集中在附录。

## 构建

从仓库根目录执行：

```bash
node revision/build_handout.mjs
```

输出为 `revision/output/pdf/CS6382_Assignment_1_Beginner_Revision_Handout.zh.pdf`，中间文件位于 `tmp/pdfs/`。脚本依次生成图形、转换矢量插图、调用 Pandoc，并运行三轮 XeLaTeX 更新目录和链接。

环境需要 Node.js 22.13 或更新版本、npm、Pandoc、XeLaTeX、`rsvg-convert` 和 Poppler（`pdfinfo`、`pdftoppm`、`pdftotext`）。当前模板使用 macOS 的 Songti SC、Heiti SC、PingFang SC、Times New Roman、Arial 和 Menlo 字体。

首次构建会将 Mermaid CLI 12.0.0 安装至仓库的 `.cache/cs6382-handout-tools/`，不修改全局 npm 包。默认使用本机已安装的 Google Chrome 渲染图形；如使用其他位置的 Chrome 或 Chromium，可指定可执行文件：

```bash
HANDOUT_CHROME='/path/to/chrome' node revision/build_handout.mjs
```

## 修订

- 修改正文：编辑 `CS6382_Assignment_1_Beginner_Revision_Handout.zh.md`。独立公式使用 fenced `math` 块，图形使用相对路径。
- 修改图形：编辑 `make_figures.mjs` 中的 SVG 绘图，或 `Mermaid_Source.md` 中的 Mermaid 定义，再重新构建。`figures/` 中的图形是生成结果，手动修改会在重建时被覆盖。
- 修改版式：编辑 `handout-template.tex`；`handout-filter.lua` 负责公式转换、表格列宽、章节层级和矢量插图路径。
- 查看 Mermaid 文本：`figures/` 中保留四份 `.mmd` 文件及对应 SVG。结构关系图由 Mermaid 生成，几何图与精确布局图由 SVG 绘制。

## 质量检查

重建后检查编译日志中的越界、缺字与未解决引用，再将 PDF 每页渲染为图片查看。公式的文本提取可能改变排版顺序，不能代替视觉检查。

```bash
pdftoppm -r 105 -png revision/output/pdf/CS6382_Assignment_1_Beginner_Revision_Handout.zh.pdf tmp/pdfs/page
pdftotext -layout revision/output/pdf/CS6382_Assignment_1_Beginner_Revision_Handout.zh.pdf tmp/pdfs/handout.txt
```

题意以 `docs/` 的原始 PDF 为准。本目录不会改动题目、已有答案和提交材料。
