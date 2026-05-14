# 假数据与风险场景配置说明

本 Demo **全部数据为前端静态 Mock**，便于改数与加场景。主要集中在一个文件，少量问答在独立文件。

## 文件位置

| 文件 | 作用 |
|------|------|
| `src/mock/index.js` | 驾驶舱 KPI、板块、子公司、投资/资金/合同/采购、风险样本、工单、图谱数据、热力图生成函数等 |
| `src/mock/qa.js` | 智能问数关键词匹配与图表配置 |

## 修改方式

1. 用编辑器打开 `src/mock/index.js`。
2. 改数组或对象字段即可，**无需改接口**（无后端）。
3. 保存后 Vite 热更新；若图表未刷新，浏览器强制刷新一次。

## 核心常量说明

- **`KPI`**：驾驶舱顶部数字（法人户数、账户数、在投项目数、开放风险数等）。
- **`SECTORS`**：五大业务板块；影响热力图纵轴、多个页面的板块列表。
- **`COMPANIES`**：`sectorId` 需与 `SECTORS[].id` 对应，用于下钻筛选。
- **`RISK_SAMPLES`**：驾驶舱与风险中心表格的 10 类风险；字段 `scene` 用于路由跳转，取值：`investment` / `funds` / `contract` / `procurement` / `finance` / `property` / `salary` / `overseas`。
- **`INVESTMENT_PROJECTS`**：投资穿透项目；`actualYi > budgetYi` 时表格与图表标红。
- **`ACCOUNTS` / `FUND_FLOWS`**：资金穿透；`riskFlag` / `risk` 控制标红与工单入口。
- **`CONTRACTS`**：合同穿透；`level` 取 `low` / `medium` / `high`，与 `RiskBadge` 配色一致。
- **`PROCUREMENT_PACKAGES`**：`aiScore` 控制围标概率；`bidders` 数组展示 IP/MAC/报价。
- **`GRAPH_*`**：G6 图谱的 `nodes`（`id`,`label`,`type`）与 `edges`（`source`,`target`,`label`）。`type` 影响节点颜色映射（见 `KnowledgeGraph.vue` 内 `typeColor`）。

## 风险等级与配色

与 `src/constants/risk.js` 中 **`RISK_LEVELS`** 一致：`low`（绿）、`medium`（黄）、`high`（橙）、`critical`（红）。

## 智能问数

编辑 `src/mock/qa.js`：

- 在 **`QA_PRESETS`** 中新增对象：`keys` 为触发关键词数组；`answer` 为说明文字；`chart` 支持 `pie` / `bar` / `line`（字段与 `SmartPlatformView.vue` 中解析逻辑一致）。
- **`matchQA`** 按数组顺序命中第一个关键词匹配项。

## 演示环境与运行

```bash
cd 原型demo
npm install
npm run dev
```

浏览器访问控制台输出的本地地址（默认 `http://localhost:5173`）。使用 **Hash 路由**，可直接打开子路径书签。

打包预览：

```bash
npm run build
npm run preview
```

## 性能与兜底

- 图谱数据量保持 **几十节点以内** 以保证拖拽流畅。
- 大屏下若字偏小，已通过 `global.css` 对 ≥2560px / ≥3840px 放大根字号，可按现场再调。
