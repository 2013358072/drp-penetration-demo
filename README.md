# DRP 穿透式监管演示原型

基于 Vue3 + Vite 构建的穿透式监管（DRP）前端演示 Demo，用于向管理层、风控部门及监管机构直观展示集团级穿透式监管能力。

## 技术栈

- **框架：** Vue 3 + Vue Router
- **构建：** Vite 5
- **可视化：** ECharts 5 + AntV G6
- **语言：** JavaScript

## 快速启动

```bash
npm install
npm run dev
```

浏览器打开 `http://localhost:5173/`

## 功能模块

| 模块 | 说明 |
|------|------|
| 🏠 **全景驾驶舱** | 集团 KPI 大盘、风险热力图、实时预警轮播 |
| 📊 **投资穿透** | 集团→板块→子公司→项目→单据，五级逐层下钻 |
| 💰 **资金穿透** | 资金池全景、账户流水穿透、大额异常拦截 |
| 📦 **采购穿透** | 围标概率分析、投标文件比对、关联方图谱 |
| 📝 **合同穿透** | NLP 条款审查、履约进度、高风险条款标红 |
| 🤖 **智能中台** | AI 智能问数、主动预警、关联分析、报告生成、决策建议 |
| ⚠️ **风险预警中心** | 10 类预置风险样本，一键穿透 |
| 📋 **核查工单** | 待派单→核查中→整改中→待验收→已销号，全流程闭环 |
| ✅ **整改销号** | 五步闭环，状态流转可视化 |
| ⚡ **效果对比** | 无 DRP vs 有 DRP 量化对比 |

## 演示脚本

标准 30 分钟演示流程详见 `DEMO_SCRIPT.md`，按受众可裁剪：
- **董事长/总经理：** 驾驶舱 + 投资/资金总览
- **CFO：** 财务/资金/合同
- **风控/审计：** 工单 + 整改 + 采购/合同
- **国资委领导：** 驾驶舱 + 政策对标

## 修改演示数据

所有 Mock 数据集中管理在 `src/mock/index.js`，修改后刷新页面即生效，无需重新构建。详见 `OPERATION_MANUAL.md`。

## 项目结构

```
原型demo/
├── public/              # 静态资源
├── src/
│   ├── components/      # 通用组件（图表、知识图谱、步骤条等）
│   ├── constants/       # 常量定义（风险配置等）
│   ├── layouts/         # 布局组件
│   ├── mock/            # Mock 数据
│   ├── router/          # 路由配置
│   ├── styles/          # 全局样式
│   └── views/
│       ├── Dashboard.vue          # 全景驾驶舱
│       ├── ComparisonView.vue     # 效果对比
│       ├── SmartPlatformView.vue  # 智能中台
│       ├── RiskCenterView.vue     # 风险预警中心
│       ├── WorkOrdersView.vue     # 核查工单
│       ├── RectificationView.vue  # 整改销号
│       └── penetrate/             # 穿透模块
│           ├── InvestmentView.vue # 投资穿透
│           ├── FundsView.vue      # 资金穿透
│           ├── ProcurementView.vue # 采购穿透
│           ├── ContractView.vue   # 合同穿透
│           ├── FinanceView.vue    # 财务穿透
│           ├── PropertyView.vue   # 产权穿透
│           ├── OverseasView.vue   # 境外穿透
│           ├── SalaryView.vue     # 薪酬穿透
│           ├── BankingView.vue    # 金融穿透
│           ├── AccountingView.vue # 会计穿透
│           └── ...                # 更多占位模块
├── index.html
├── vite.config.js
└── package.json
```
