# Copy Audit — 中英文对照

> 站点界面与项目元数据的双语文案清单。  
> Notion 正文内容以 Notion 页面为准（见文末映射表）。  
> 最后更新：2026-08-10

---

## 1. Site / Hero

| Key | 中文 (zh) | English (en) | Source |
|-----|-----------|--------------|--------|
| site.name | 周染心 | Ranxin Zhou | `src/data/site.ts` |
| site.description | AI Product Designer / XR Product Designer。擅长从 0→1 定义产品形态，将复杂系统能力抽象为清晰的产品模型，并转化为自然、易理解、可落地的用户体验。 | AI Product Designer / XR Product Designer. Defines product form from 0→1, abstracts complex system capabilities into clear product models, and turns them into natural, understandable, and shippable user experiences. | `src/data/site.ts` |
| hero.name | 周染心 | Ranxin Zhou | `homeContent` |
| hero.role | AI Product Designer / XR Product Designer | AI Product Designer / XR Product Designer | `homeContent` |
| hero.intro | 擅长从 0→1 定义产品形态，将复杂系统能力抽象为清晰的产品模型，并转化为自然、易理解、可落地的用户体验。 | Defines product form from 0→1, abstracts complex system capabilities into clear product models, and turns them into natural, understandable, and shippable user experiences. | `homeContent` |
| contact.label | contact | contact | `homeContent` |
| contact.copyright | © {year} 周染心 | © {year} Ranxin Zhou | `homeContent` |
| toc | 目录 | Contents | `homeContent` |
| ui.back | ← 返回 | ← Back | `homeContent` |
| ui.labEyebrow | 3D Lab | 3D Lab | `homeContent` |
| ui.featuredLabel | 精选项目 | Featured Project | `homeContent` / landing |
| ui.selectedWorksLabel | 精选作品 | Selected Works | `homeContent` / landing |

---

## 2. Homepage Landing

### Featured — LinkText

| Field | 中文 | English |
|-------|------|---------|
| label | 精选项目 | Featured Project |
| title | LinkText | LinkText |
| subtitle | AI 原生语言学习系统 | AI-native Language Learning System |
| description | 从阅读出发，构建 AI 驱动的语言学习体验，将碎片化内容转化为持续积累的知识。 | Building AI-driven language learning from reading, turning fragmented content into accumulated knowledge. |
| tags | AI Workflow / Knowledge Structure / Prompt Design / LLM | （同左） |

Source: `src/data/landing.ts`

### Selected Works — XREAL

| Field | 中文 | English |
|-------|------|---------|
| section label | 精选作品 | Selected Works |
| column title | XREAL | XREAL |
| column description | 围绕消费级 AR 眼镜，探索自然、高效且可规模化的空间交互体验。 | Exploring natural, efficient, and scalable spatial interaction for consumer AR glasses. |
| item | 手势快捷交互系统 | Gesture Interaction System |
| child | 全局菜单 | Gesture-Based Spatial Menu |
| child | 窗口调整 | Gesture Interaction Solution: Window Adjustment |
| item | Spatial Anchor算法产品化探索 | Spatial Anchor Productization Exploration |

### Selected Works — Research

| Field | 中文 | English |
|-------|------|---------|
| column title | 研究 | Research |
| item title | 商业模拟游戏中的 AI Agent | Business Simulation AI Agent |
| item description | 酒店经营商业模拟游戏中的 AI Learning Agent，为玩家提供持续的商业学习支持。 | An AI Learning Agent in a hotel management simulation game that provides ongoing business learning support for players. |
| item title | 3D 交互与创意编程 | 3D & Creative Coding |
| item description | 围绕 Unity 与生成式视觉进行交互实验。 | Interaction experiments with Unity and generative visuals. |

---

## 3. Project tree titles / descriptions

| Route | 中文 title | English title | 中文 description | English description |
|-------|------------|---------------|------------------|---------------------|
| `/projects/linktext` | LinkText | LinkText | 从阅读出发，构建 AI 驱动的语言学习体验，将碎片化内容转化为持续积累的知识。 | Building AI-driven language learning from reading, turning fragmented content into accumulated knowledge. |
| `/projects/xreal` | XREAL | XREAL | 围绕消费级 AR 眼镜，探索自然、高效且可规模化的空间交互体验。 | Exploring natural, efficient, and scalable spatial interaction for consumer AR glasses. |
| `/projects/xreal/gesture-interaction` | 手势快捷交互系统 | Gesture Interaction System | 构建适用于空间界面的手势交互语言与输入模型。 | Building gesture interaction language and input models for spatial interfaces. |
| `/projects/xreal/gesture-interaction/quick-menu` | 全局菜单 | Gesture-Based Spatial Menu | 通过注视与手势组合，实现高效的全局功能调用。 | Efficient global function access through gaze and gesture combinations. |
| `/projects/xreal/gesture-interaction/input-model` | 窗口调整 | Gesture Interaction Solution: Window Adjustment | 面向三维空间的窗口移动、缩放与旋转交互。 | Move, scale, and rotate windows in three-dimensional space. |
| `/projects/xreal/spatial-anchor` | Spatial Anchor算法产品化探索 | Spatial Anchor Productization Exploration | 探索空间锚点能力如何转化为用户可理解、可使用的产品体验。 | Translating spatial anchor capabilities into product experiences users can understand and use. |
| `/projects/lab/ai-agent-simulator` | 商业模拟游戏中的AI Agent | Business Simulation AI Agent | 酒店经营商业模拟游戏中的 AI Learning Agent，为玩家提供持续的商业学习支持。 | An AI Learning Agent in a hotel management simulation game that provides ongoing business learning support for players. |
| `/projects/lab/3d-visual-experiments` | 3D 交互与创意编程 | 3D & Creative Coding | 围绕 Unity 与生成式视觉进行交互实验。 | Interaction experiments with Unity and generative visuals. |

Source: `src/data/projects.ts` · `src/data/index-content.ts`

---

## 4. 3D Lab overlay copy

| Stage | 中文 title | English title | 中文 description | English description |
|-------|------------|---------------|------------------|---------------------|
| 1 | Unity 交互实验 | Unity Interaction Experiment | 移动鼠标体验交互 | Move the mouse to interact |
| 2 | Unity 交互实验 | Unity Interaction Experiment | 按空格键跳跃，然后按 wasd 键移动 | Press Space to jump, then use WASD to move |
| 3 | Unity 交互实验 | Unity Interaction Experiment | 按空格键投掷骰子 | Press Space to throw the dice |

Source: `src/data/visual-experiment-stages.ts`

---

## 5. Notion page ID mapping（中英双版本）

对照 Notion 工作区标题：

| Site route | Notion 中文标题 | `pageId` (zh) | Notion English title | `pageIdEn` (en) |
|------------|-----------------|---------------|----------------------|-----------------|
| `/projects/linktext` | LinkText | `35f3e8e3610f80788222e6cd6fbf31e8` | LinkText English | `3b13e8e3610f801cafb2e2f9c5a588fa` |
| `/projects/xreal` | 手势快捷交互系统（New） | `38e3e8e3610f805abb66e929b5a75542` | Gesture Interaction System (New) | `3b23e8e3610f80099e79eb642ed016d3` |
| `/projects/xreal/gesture-interaction` | 手势快捷交互系统（New） | `38e3e8e3610f805abb66e929b5a75542` | Gesture Interaction System (New) | `3b23e8e3610f80099e79eb642ed016d3` |
| `/projects/xreal/gesture-interaction/quick-menu` | 手势快捷方案：全局菜单 | `37b3e8e3610f8039a2d8e4e2c165fc4c` | Gesture-Based Spatial Menu | `3b23e8e3610f802fa2aae5dad6de7697` |
| `/projects/xreal/gesture-interaction/input-model` | 手势快捷方案：窗口调整 | `3823e8e3610f80ba903bc2dd9d16955f` | Gesture Interaction Solution: Window Adjustment | `3b23e8e3610f80a48cf4ebcceb5465f7` |
| `/projects/xreal/spatial-anchor` | Spatial Anchor 算法产品化探索 | `38e3e8e3610f8027acd6d1dfcd9acd61` | Spatial Anchor Productization Exploration | `3b33e8e3610f80ce8254ca8c1d20cfee` |
| `/projects/lab/ai-agent-simulator` | 商学模拟器AI Agent | `3933e8e3610f807b80a5c52670bf92fb` | Business Simulation AI Agent | `3b33e8e3610f8062a5deed18bd40f73e` |
| `/projects/lab/3d-visual-experiments` | 3D & Creative Coding | `3943e8e3610f803fa112e75b7ccebc2b` | —（暂无英文 Notion 页，使用 standalone Unity 页） | — |

Source of truth: `src/data/projects.ts`

### 切换机制

1. 顶栏 **中文 / EN** 写入 cookie `portfolio-locale`
2. 项目页 `force-dynamic`，按 cookie 选择 `pageId` 或 `pageIdEn`
3. 切换语言会 `router.refresh()`，重新拉取对应 Notion 页

### 注意

- 请确认所有英文 Notion 页已 **Share** 给站点 Integration（与中文页相同）
- `3D & Creative Coding` 目前仅有中文 Notion 页且站点使用 standalone Unity 体验；若后续补英文 Notion，在 `projects.ts` 增加 `pageIdEn` 即可
- `Resume English` Notion 页尚未接入站点路由

---

## 6. Header / chrome

| UI | 中文 | English |
|----|------|---------|
| Brand | Portfolio | Portfolio |
| Language switch | 中文 / EN | 中文 / EN |
