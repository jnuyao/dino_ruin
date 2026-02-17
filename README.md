# Dino Math Ruins

一个面向 6-7 岁儿童的 Web 数学闯关游戏。孩子通过“遗迹机关”完成数学思维训练（规律、凑数、分类、排除），并通过碎片-孵蛋-图鉴形成持续反馈循环。

## 项目亮点
- 20 关数据驱动关卡（`data/levels.json`）
- 三类交互题型：点选、拖槽、分桶
- 本地存档（刷新不丢进度）
- 碎片奖励与孵蛋解锁
- 儿童友好的游戏化 UI 与通关动画

## 在线流程
1. 地图选关：`/`
2. 进入关卡：`/level/[id]`
3. 通关后获得碎片并回到地图
4. 碎片足够后在 `/hatch` 孵蛋
5. 在 `/dex` 查看已解锁恐龙

## 快速开始
```bash
npm install
npm run dev
```
默认启动在 `http://localhost:3000`。

生产构建：
```bash
npm run build
npm run start
```

## 技术栈
- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind CSS
- localStorage（MVP 存档）

## 目录结构
```text
app/                页面与路由
components/         UI 与关卡组件
data/levels.json    关卡题库
lib/                存档、判定引擎、类型定义
docs/               项目补充文档
```

## 核心设计
- 关卡引擎：通过 `level.type` + `rule` 执行判定策略
- 存档模型：`dino_save_v1` 保存关卡进度、碎片、图鉴状态
- 奖励策略：基础碎片 + 无提示额外奖励

详见：
- [项目总览](docs/PROJECT_OVERVIEW.md)
- [架构说明](docs/ARCHITECTURE.md)
- [贡献指南](CONTRIBUTING.md)
- [安全策略](SECURITY.md)
- [更新记录](CHANGELOG.md)

## 路线图（Roadmap）
- [ ] dnd-kit 拖拽重构（提升平板体验）
- [ ] 家长页统计完善
- [ ] Supabase 云端存档同步
- [ ] 登录与多设备同步

## 贡献
欢迎提交 Issue / PR。提交前请先阅读 `CONTRIBUTING.md`。
