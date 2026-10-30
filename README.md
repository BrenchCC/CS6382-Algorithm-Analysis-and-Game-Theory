# CS6382 Algorithm Analysis and Game Theory

本仓库整理 CS6382 的作业题目、解答和复习资料。原题共有六题；`assignment1` 收录第 1、2、6 题的中英文答案，`assignment2` 补全第 3、4、5 题。复习讲义覆盖全部六题。

## 从哪里开始

| 需要查看 | 文件 |
| --- | --- |
| 作业原题 | [原始 PDF](docs/CS6382_Assignment_1_Questions-1.pdf) · [中文转写](docs/CS6382_Assignment_1_Questions-1.zh.md) · [英文转写](docs/CS6382_Assignment_1_Questions-1.en.md) |
| 第 1、2、6 题答案 | [中文](assignment1/answers/CS6382_Assignment_1_Answers_Selected.zh.md) · [English](assignment1/answers/CS6382_Assignment_1_Answers_Selected.en.md) |
| 第 3、4、5 题答案 | [中文](assignment2/answers/CS6382_Assignment_2_Answers_Remaining.zh.md) · [English](assignment2/answers/CS6382_Assignment_2_Answers_Remaining.en.md) |
| 全题复习讲义 | [中文 Markdown](revision/CS6382_Assignment_1_Beginner_Revision_Handout.zh.md) · [PDF](revision/output/pdf/CS6382_Assignment_1_Beginner_Revision_Handout.zh.pdf) |
| 手写提交件 | [第 1、2、6 题 PDF](assignment1/submit/CS6382_Assignment_1_Handwritten_Submission.pdf) · [第 3、4、5 题 PDF](assignment2/submit/CS6382_Assignment_2_Handwritten_Submission.pdf) |

题意以原始 PDF 为准。两组答案按小问编号组织，保留必要的计算和证明，便于对照题目手写。两份手写提交件分别包含第 1、2、6 题和第 3、4、5 题。

## 目录结构

| 位置 | 内容 |
| --- | --- |
| `docs/` | 原始题目 PDF，以及中、英文 Markdown 转写 |
| `revision/` | 中文复习讲义、Mermaid 源定义、构建脚本、排版模板和验证记录 |
| `revision/figures/` | 讲义使用的 SVG 图及对应的 Mermaid 文件 |
| `revision/output/pdf/` | 已生成的复习讲义 PDF |
| `assignment1/answers/` | 第 1、2、6 题的中、英文答案 |
| `assignment1/submit/originals/` | 手写稿的 HEIC 原图 |
| `assignment1/submit/pages/` | 从原图转换的第 1、2、6 题 JPG 页面 |
| `assignment1/submit/` | 合并后的手写提交 PDF |
| `assignment2/answers/` | 同一套题中第 3、4、5 题的中、英文答案 |
| `assignment2/submit/originals/` | 第 3、4、5 题手写稿的 DNG 原图 |
| `assignment2/submit/pages/` | 方向已校正的第 3、4、5 题 JPG 页面 |
| `assignment2/submit/` | 合并后的三页 A4 手写提交 PDF |

## 复习讲义

讲义从基本概念入手，覆盖六题的全部小问，并配有图解、自测题和答案。若只需查看结论与证明，可直接阅读上表的答案文件；若需要理解推导过程，可阅读讲义。

讲义的编辑源文件、图形和构建脚本位于根目录的 `revision/`。构建方式、环境要求及图形修改方法见[讲义目录说明](revision/README.md)；已有的内容与 PDF 检查记录见[验证记录](revision/VALIDATION.md)。

从仓库根目录重新生成讲义 PDF：

```bash
node revision/build_handout.mjs
```

生成文件位于 `revision/output/pdf/`。
