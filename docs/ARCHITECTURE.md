# 架构说明

## 1. 运行架构
- 前端：Next.js App Router
- 数据来源：`data/levels.json`
- 存档：浏览器 `localStorage`

## 2. 关卡系统
关卡通过统一结构描述：
- `type`: `select_cards` | `drag_to_slots` | `drag_to_buckets`
- `ui`: 关卡渲染参数
- `rule`: 结构化判定规则
- `hints`: 提示列表
- `reward`: 奖励配置

判定入口：`lib/evaluator.ts` 的 `evaluateLevel(level, state)`。

## 3. 存档系统
存档 key：`dino_save_v1`。

存档包含：
- 解锁关卡
- 每关通关状态与星级
- 碎片总数
- 已解锁恐龙

主要逻辑：
- `lib/save.ts`: 初始化/读取/持久化/结算
- `lib/useSave.ts`: 客户端状态管理与 UI 同步

## 4. 页面路由
- `/` 地图页
- `/level/[id]` 关卡页
- `/hatch` 孵蛋页
- `/dex` 图鉴页
- `/parent` 家长页

## 5. 预留接口
- `POST /api/save/sync`
- `GET /api/save/me`
- `POST /api/events`
