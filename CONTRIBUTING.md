# Contributing Guide

## 开始之前
1. Fork 或直接在仓库新建分支开发
2. 安装依赖：`npm install`
3. 本地运行：`npm run dev`
4. 提交前确保：`npm run build` 通过

## 分支与提交
- 分支建议：`feature/*`、`fix/*`、`chore/*`
- 提交信息建议：
  - `feat: ...`
  - `fix: ...`
  - `docs: ...`
  - `refactor: ...`

## PR 要求
1. 描述清楚改动目标
2. 说明影响页面或模块
3. 附上测试方式
4. UI 改动建议附截图或录屏

## 代码规范
- TypeScript 严格模式，不引入 `any` 逃逸
- 关卡配置优先写在 `data/levels.json`，避免写死在组件
- 不破坏现有存档字段兼容性（`dino_save_v1`）
