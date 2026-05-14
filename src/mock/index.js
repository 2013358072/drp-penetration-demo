/** 全站静态假数据 — 演示用，可自由改数值 */

export const KPI = {
  legalEntities: 82,
  sectors: 5,
  bankAccounts: 1246,
  investmentProjects: 42,
  openRisks: 37,
  closedRisksMonth: 128,
  totalAssetsYi: 4860,
}

export const SECTORS = [
  { id: 's1', name: '电力能源', riskScore: 62, projects: 14, revenueYi: 1280 },
  { id: 's2', name: '装备制造', riskScore: 48, projects: 9, revenueYi: 620 },
  { id: 's3', name: '工程建设', riskScore: 71, projects: 11, revenueYi: 890 },
  { id: 's4', name: '金融服务', riskScore: 55, projects: 4, revenueYi: 210 },
  { id: 's5', name: '科创与其他', riskScore: 41, projects: 4, revenueYi: 180 },
]

/** 子公司（演示用子集） */
export const COMPANIES = [
  { id: 'c1', sectorId: 's1', name: '华东电力有限公司', city: '上海', risk: 'high' },
  { id: 'c2', sectorId: 's1', name: '西北新能源投资公司', city: '西安', risk: 'medium' },
  { id: 'c3', sectorId: 's2', name: '重型装备集团', city: '太原', risk: 'low' },
  { id: 'c4', sectorId: 's3', name: '海外工程总承包公司', city: '北京', risk: 'critical' },
  { id: 'c5', sectorId: 's3', name: '城市基建投资公司', city: '深圳', risk: 'high' },
  { id: 'c6', sectorId: 's4', name: '集团财务公司', city: '北京', risk: 'medium' },
  { id: 'c7', sectorId: 's5', name: '数字科技公司', city: '杭州', risk: 'low' },
]

export const RISK_SAMPLES = [
  { id: 'R01', type: '投资超预算', level: 'critical', sector: '工程建设', company: '海外工程总承包公司', summary: '某境外路桥项目累计投资超批复预算 18.6%', scene: 'investment' },
  { id: 'R02', type: '大额异常支付', level: 'high', sector: '电力能源', company: '华东电力有限公司', summary: '对非主营供应商单笔支付 9200 万元，未关联合同编号', scene: 'funds' },
  { id: 'R03', type: '管理费用激增', level: 'medium', sector: '装备制造', company: '重型装备集团', summary: '管理费用同比 +34%，偏离板块均值', scene: 'finance' },
  { id: 'R04', type: '股权多层嵌套', level: 'high', sector: '金融服务', company: '集团财务公司', summary: 'SPV 层级 ≥5 层，实际控制人穿透待核查', scene: 'property' },
  { id: 'R05', type: '高风险合同', level: 'high', sector: '工程建设', company: '城市基建投资公司', summary: '无限责任条款 + 背靠背支付，NLP 标红', scene: 'contract' },
  { id: 'R06', type: '围标串标', level: 'critical', sector: '工程建设', company: '海外工程总承包公司', summary: '三家投标单位 MAC 地址相同，报价呈阶梯分布', scene: 'procurement' },
  { id: 'R07', type: '隐性薪酬', level: 'medium', sector: '科创与其他', company: '数字科技公司', summary: '费用科目向自然人频繁支付，疑似变相薪酬', scene: 'salary' },
  { id: 'R08', type: '境外资金延迟', level: 'medium', sector: '工程建设', company: '海外工程总承包公司', summary: '境外账户回款延迟 >45 天', scene: 'overseas' },
  { id: 'R09', type: '关联交易', level: 'high', sector: '电力能源', company: '西北新能源投资公司', summary: '与关联方交易量环比 +120%', scene: 'finance' },
  { id: 'R10', type: '疑似利益输送', level: 'critical', sector: '电力能源', company: '华东电力有限公司', summary: '高管亲属控制企业与本公司大额采购重叠', scene: 'procurement' },
  { id: 'R11', type: '投资关联交易', level: 'critical', sector: '电力能源', company: '西北新能源投资公司', summary: '陇东风电基地二期超预算 12%，EPC 承包商与子公司股东存在隐蔽关联', scene: 'investment' },
]

export const INVESTMENT_PROJECTS = [
  { id: 'P01', sectorId: 's3', companyId: 'c4', name: '东南亚某国路桥 PPP', budgetYi: 12.4, actualYi: 14.7, status: '超预算', risk: 'critical', phase: '建设期' },
  { id: 'P02', sectorId: 's1', companyId: 'c2', name: '风光储一体化基地', budgetYi: 28, actualYi: 26.2, status: '正常', risk: 'low', phase: '投产' },
  { id: 'P03', sectorId: 's1', companyId: 'c1', name: '煤电灵活性改造', budgetYi: 3.2, actualYi: 3.1, status: '正常', risk: 'low', phase: '收尾' },
  { id: 'P04', sectorId: 's3', companyId: 'c5', name: '片区综合开发', budgetYi: 45, actualYi: 46.8, status: '预警', risk: 'high', phase: '投资期' },
  { id: 'P05', sectorId: 's2', companyId: 'c3', name: '海上风电安装船建造', budgetYi: 8.6, actualYi: 8.4, status: '正常', risk: 'medium', phase: '建造' },
  { id: 'P06', sectorId: 's1', companyId: 'c2', name: '陇东风电基地二期', budgetYi: 15, actualYi: 16.8, status: '超预算', risk: 'critical', phase: '建设期' },
]

export const INVESTMENT_PROJECT_PROFILES = {
  P01: {
    progress: 72,
    location: '东南亚某国',
    owner: '海外工程总承包公司',
    board: '工程建设',
    milestoneStatus: '关键节点延期 2 个',
    overBudgetRate: 18.6,
    causeAnalysis: '设计变更频繁、钢材价格上涨叠加境外分包重议价，导致累计投资显著偏离原批复预算。',
    relatedTradeAmountYi: 4.1,
    relatedTradeRatio: 27.9,
    hiddenRelationCount: 2,
    hiddenRelationNote: '当地分包 A 与高管亲属企业存在同一控制关系，且与 EPC 总包存在资金拆借。',
    fundTrend: [
      { month: '2025-11', budget: 1.2, actual: 1.4 },
      { month: '2025-12', budget: 2.5, actual: 2.8 },
      { month: '2026-01', budget: 4.1, actual: 4.9 },
      { month: '2026-02', budget: 6.6, actual: 7.8 },
      { month: '2026-03', budget: 9.3, actual: 11.1 },
      { month: '2026-04', budget: 12.4, actual: 14.7 },
    ],
    milestones: [
      { name: '可研批复', planned: '2025-10-18', actual: '2025-10-18', status: 'done', note: '集团投委会通过' },
      { name: 'EPC 合同签署', planned: '2025-11-10', actual: '2025-11-24', status: 'delay', note: '合同签署延期 14 天' },
      { name: '主体工程开工', planned: '2025-12-05', actual: '2025-12-20', status: 'delay', note: '当地审批延后' },
      { name: '桥梁主跨合龙', planned: '2026-06-30', actual: '-', status: 'running', note: '当前完成 72%' },
    ],
    alerts: [
      {
        id: 'IA-P01-1',
        type: '超预算预警',
        level: 'critical',
        title: '东南亚某国路桥 PPP 累计超预算 18.6%',
        detail: '系统识别设计变更、材料涨价和境外分包重议价三项主因，自动标红并建议启动投资偏差核查。',
        workOrderId: 'WO-2026-0037',
      },
      {
        id: 'IA-P01-2',
        type: '关联交易预警',
        level: 'high',
        title: '当地分包 A 与高管亲属企业存在同一控制关系',
        detail: '关联交易金额 4.1 亿元，占项目累计支出 27.9%，已推送至核查工单并要求补充穿透底稿。',
        workOrderId: 'WO-2026-0047',
      },
    ],
  },
  P02: {
    progress: 94,
    location: '甘肃酒泉',
    owner: '西北新能源投资公司',
    board: '电力能源',
    milestoneStatus: '已进入试运行',
    overBudgetRate: -6.4,
    causeAnalysis: '设备集中采购议价后成本低于原计划，投资执行总体平稳。',
    relatedTradeAmountYi: 1.8,
    relatedTradeRatio: 6.9,
    hiddenRelationCount: 0,
    hiddenRelationNote: '未发现隐蔽关联方。',
    fundTrend: [
      { month: '2025-12', budget: 6, actual: 5.8 },
      { month: '2026-01', budget: 12, actual: 11.2 },
      { month: '2026-02', budget: 18, actual: 17.3 },
      { month: '2026-03', budget: 23, actual: 22.1 },
      { month: '2026-04', budget: 28, actual: 26.2 },
    ],
    milestones: [
      { name: '主设备到货', planned: '2025-12-15', actual: '2025-12-12', status: 'done', note: '提前到货' },
      { name: '风机吊装完成', planned: '2026-02-28', actual: '2026-02-26', status: 'done', note: '按计划完成' },
      { name: '全容量并网', planned: '2026-05-10', actual: '-', status: 'running', note: '并网准备中' },
    ],
    alerts: [],
  },
  P03: {
    progress: 97,
    location: '上海',
    owner: '华东电力有限公司',
    board: '电力能源',
    milestoneStatus: '竣工验收准备中',
    overBudgetRate: -3.1,
    causeAnalysis: '设备国产化替代使整体成本略低于预算。',
    relatedTradeAmountYi: 0.12,
    relatedTradeRatio: 3.9,
    hiddenRelationCount: 0,
    hiddenRelationNote: '暂未发现异常关联交易。',
    fundTrend: [
      { month: '2025-12', budget: 0.8, actual: 0.75 },
      { month: '2026-01', budget: 1.4, actual: 1.37 },
      { month: '2026-02', budget: 2.4, actual: 2.28 },
      { month: '2026-03', budget: 3.2, actual: 3.1 },
    ],
    milestones: [
      { name: '改造方案批复', planned: '2025-11-08', actual: '2025-11-08', status: 'done', note: '已完成' },
      { name: '机组停机改造', planned: '2026-01-05', actual: '2026-01-04', status: 'done', note: '按计划完成' },
      { name: '性能考核', planned: '2026-05-30', actual: '-', status: 'running', note: '准备考核' },
    ],
    alerts: [],
  },
  P04: {
    progress: 61,
    location: '深圳',
    owner: '城市基建投资公司',
    board: '工程建设',
    milestoneStatus: '拆迁补偿阶段',
    overBudgetRate: 4,
    causeAnalysis: '土地整备支出超预期，专项配套费用上浮。',
    relatedTradeAmountYi: 8.6,
    relatedTradeRatio: 18.4,
    hiddenRelationCount: 1,
    hiddenRelationNote: '土石方运输供应商与项目乙方存在历史合作集中度偏高。',
    fundTrend: [
      { month: '2025-12', budget: 8, actual: 8.1 },
      { month: '2026-01', budget: 16, actual: 16.5 },
      { month: '2026-02', budget: 24, actual: 25.4 },
      { month: '2026-03', budget: 34, actual: 35.7 },
      { month: '2026-04', budget: 45, actual: 46.8 },
    ],
    milestones: [
      { name: '项目立项', planned: '2025-09-15', actual: '2025-09-15', status: 'done', note: '已完成' },
      { name: '征拆协调', planned: '2026-02-20', actual: '2026-03-05', status: 'delay', note: '延期 13 天' },
      { name: '一期开发开工', planned: '2026-06-15', actual: '-', status: 'running', note: '前置手续办理中' },
    ],
    alerts: [
      {
        id: 'IA-P04-1',
        type: '超预算预警',
        level: 'high',
        title: '片区综合开发配套费用偏离预算 4%',
        detail: '目前偏差可控，但已触发持续监测阈值，建议跟踪征拆和配套建设费用。',
        workOrderId: 'WO-2026-0048',
      },
    ],
  },
  P05: {
    progress: 58,
    location: '江苏南通',
    owner: '重型装备集团',
    board: '装备制造',
    milestoneStatus: '船体总装中',
    overBudgetRate: -2.3,
    causeAnalysis: '关键部件采购锁价有效，整体投资执行平稳。',
    relatedTradeAmountYi: 0.7,
    relatedTradeRatio: 8.3,
    hiddenRelationCount: 0,
    hiddenRelationNote: '未识别异常关联路径。',
    fundTrend: [
      { month: '2025-12', budget: 1.8, actual: 1.7 },
      { month: '2026-01', budget: 3.6, actual: 3.5 },
      { month: '2026-02', budget: 5.2, actual: 5.1 },
      { month: '2026-03', budget: 6.9, actual: 6.8 },
      { month: '2026-04', budget: 8.6, actual: 8.4 },
    ],
    milestones: [
      { name: '详细设计冻结', planned: '2025-11-20', actual: '2025-11-18', status: 'done', note: '提前完成' },
      { name: '龙骨铺设', planned: '2026-01-15', actual: '2026-01-15', status: 'done', note: '按计划完成' },
      { name: '下水试验', planned: '2026-08-30', actual: '-', status: 'running', note: '总装中' },
    ],
    alerts: [],
  },
  P06: {
    progress: 64,
    location: '甘肃庆阳',
    owner: '西北新能源投资公司',
    board: '电力能源',
    milestoneStatus: '升压站土建和风机基础同步推进',
    overBudgetRate: 12,
    causeAnalysis: '升压站设计变更、叶片运输费用上浮且 EPC 承包商与子公司股东存在隐蔽关联，采购价格偏离市场基准。',
    relatedTradeAmountYi: 5.4,
    relatedTradeRatio: 32.1,
    hiddenRelationCount: 3,
    hiddenRelationNote: 'EPC 承包商与子公司少数股东、设备代理商存在交叉持股和一致行动关系。',
    fundTrend: [
      { month: '2025-12', budget: 2.5, actual: 2.6 },
      { month: '2026-01', budget: 5.1, actual: 5.7 },
      { month: '2026-02', budget: 8.3, actual: 9.6 },
      { month: '2026-03', budget: 11.7, actual: 13.5 },
      { month: '2026-04', budget: 15, actual: 16.8 },
    ],
    milestones: [
      { name: '集团批复', planned: '2025-11-01', actual: '2025-11-01', status: 'done', note: '计划总投资 15 亿元' },
      { name: 'EPC 招标定标', planned: '2025-12-20', actual: '2026-01-06', status: 'delay', note: '延期 17 天，供应商核查中' },
      { name: '首批风机吊装', planned: '2026-03-15', actual: '2026-03-28', status: 'delay', note: '物流费用异常上浮' },
      { name: '并网验收', planned: '2026-09-30', actual: '-', status: 'running', note: '当前完成 64%' },
    ],
    alerts: [
      {
        id: 'IA-P06-1',
        type: '超预算预警',
        level: 'critical',
        title: '陇东风电基地二期累计超预算 12%',
        detail: '系统自动标红：升压站设计变更和运输费用异常导致投资偏差扩大，建议立即复核 EPC 清单与签证。',
        workOrderId: 'WO-2026-0046',
      },
      {
        id: 'IA-P06-2',
        type: '关联交易预警',
        level: 'critical',
        title: 'EPC 承包商与子公司股东存在隐蔽关联',
        detail: '关联交易金额 5.4 亿元，占项目累计支出 32.1%，已推送核查工单并要求补充股权穿透底稿。',
        workOrderId: 'WO-2026-0047',
      },
    ],
  },
}

export const INVESTMENT_RELATION_GRAPHS = {
  P01: {
    nodes: [
      { id: 'n1', label: '集团', type: 'group' },
      { id: 'n2', label: '海外工程', type: 'company' },
      { id: 'n3', label: '东南亚 SPV', type: 'spv' },
      { id: 'n4', label: '当地分包 A', type: 'supplier' },
      { id: 'n5', label: '当地分包 B', type: 'supplier' },
      { id: 'n6', label: '高管亲属企业', type: 'related' },
    ],
    edges: [
      { source: 'n1', target: 'n2', label: '控股' },
      { source: 'n2', target: 'n3', label: '出资' },
      { source: 'n3', target: 'n4', label: '分包' },
      { source: 'n3', target: 'n5', label: '分包' },
      { source: 'n6', target: 'n4', label: '同一控制' },
    ],
  },
  P04: {
    nodes: [
      { id: 'i41', label: '城市基建投资公司', type: 'company' },
      { id: 'i42', label: '片区综合开发项目', type: 'spv' },
      { id: 'i43', label: '宏基土木集团', type: 'supplier' },
      { id: 'i44', label: '宏基物流', type: 'related' },
      { id: 'i45', label: '自然人周某', type: 'person' },
    ],
    edges: [
      { source: 'i41', target: 'i42', label: '投资主体' },
      { source: 'i42', target: 'i43', label: '施工总包 18.2 亿' },
      { source: 'i43', target: 'i44', label: '关联运输 0.6 亿' },
      { source: 'i45', target: 'i44', label: '实际控制' },
    ],
  },
  P06: {
    nodes: [
      { id: 'i61', label: '集团', type: 'group' },
      { id: 'i62', label: '西北新能源投资公司', type: 'company' },
      { id: 'i63', label: '陇东风电项目 SPV', type: 'spv' },
      { id: 'i64', label: '宁陇 EPC 联合体', type: 'supplier' },
      { id: 'i65', label: '甘肃远晟设备代理', type: 'related' },
      { id: 'i66', label: '少数股东刘某', type: 'person' },
      { id: 'i67', label: '刘某控制平台', type: 'related' },
    ],
    edges: [
      { source: 'i61', target: 'i62', label: '控股' },
      { source: 'i62', target: 'i63', label: '出资 85%' },
      { source: 'i63', target: 'i64', label: 'EPC 9.8 亿' },
      { source: 'i64', target: 'i65', label: '设备代理 2.1 亿' },
      { source: 'i66', target: 'i67', label: '持股 92%' },
      { source: 'i67', target: 'i64', label: '交叉持股' },
      { source: 'i66', target: 'i62', label: '少数股东' },
    ],
  },
}

export const ACCOUNTS = [
  { id: 'A1001', companyId: 'c1', bank: '工商银行', balanceWan: 128_000, type: '基本户', riskFlag: false },
  { id: 'A1002', companyId: 'c1', bank: '建设银行', balanceWan: 42_300, type: '一般户', riskFlag: true },
  { id: 'A2001', companyId: 'c4', bank: '中国银行', balanceWan: 86_500, type: '境外户', riskFlag: true },
  { id: 'A2002', companyId: 'c4', bank: '渣打银行', balanceWan: 31_200, type: '境外户', riskFlag: false },
]

export const FUND_FLOWS = [
  { id: 'F1', from: '华东电力有限公司', to: '某设备贸易商行', amountWan: 9200, time: '2026-04-18', contractRef: '—', risk: true },
  { id: 'F2', from: '集团财务公司', to: '西北新能源投资公司', amountWan: 50_000, time: '2026-04-12', contractRef: 'TN-2026-0088', risk: false },
  { id: 'F3', from: '海外工程总承包公司', to: '境外分包联合体', amountWan: 18_600, time: '2026-04-02', contractRef: 'OS-2025-4412', risk: false },
]

export const CONTRACTS = [
  { id: 'CT-2026-0312', companyId: 'c5', name: '大型设备采购合同', amountYi: 2.3, partyB: '宏基土木集团', riskClause: '预付100% + 无质保金', level: 'high', performance: 60 },
  { id: 'CT-2026-0098', companyId: 'c1', name: '燃煤采购长协', amountYi: 2.1, partyB: '北方能源贸易', riskClause: '无', level: 'low', performance: 88 },
  { id: 'CT-2025-4412', companyId: 'c4', name: '境外分包框架协议', amountYi: 4.2, partyB: '境外分包联合体', riskClause: '争议适用境外专属管辖', level: 'medium', performance: 45 },
  { id: 'CT-2026-0001', companyId: 'c2', name: '组件框架采购', amountYi: 0.35, partyB: '西北设备成套', riskClause: '无', level: 'low', performance: 92 },
  { id: 'CT-2026-0015', companyId: 'c3', name: '重型装备运维服务', amountYi: 0.12, partyB: '太原本地服务商', riskClause: '无', level: 'low', performance: 76 },
  { id: 'CT-2026-0080', companyId: 'c6', name: '同业拆借框架协议', amountYi: 5.0, partyB: '集团内成员单位', riskClause: '利率挂钩条款', level: 'medium', performance: 55 },
  { id: 'CT-2026-0205', companyId: 'c7', name: '数字化运维项目', amountYi: 0.08, partyB: '杭州云联科技', riskClause: '无', level: 'low', performance: 99 },
]

export const PROCUREMENT_PACKAGES = [
  {
    id: 'CG-2026-0501',
    companyId: 'c4',
    title: '海外营地物资集中采购',
    budgetWan: 3200,
    bidders: [
      { name: '盛通供应链', ip: '103.21.88.12', mac: 'A4:83:E7:11:22:33', quoteWan: 2980 },
      { name: '联创商贸', ip: '103.21.88.12', mac: 'A4:83:E7:11:22:33', quoteWan: 3010 },
      { name: '远航物资', ip: '103.21.88.12', mac: 'A4:83:E7:11:22:33', quoteWan: 3040 },
    ],
    aiScore: 0.94,
  },
  {
    id: 'CG-2026-0210',
    companyId: 'c1',
    title: '变电站二次设备框架',
    budgetWan: 5600,
    bidders: [
      { name: '南瑞系供应商 A', ip: '58.220.1.10', mac: 'B0:12:34:56:78:9A', quoteWan: 5120 },
      { name: '南瑞系供应商 B', ip: '58.220.2.20', mac: 'C1:AA:BB:CC:DD:EE', quoteWan: 5180 },
    ],
    aiScore: 0.22,
  },
  {
    id: 'CG-2026-0188',
    companyId: 'c2',
    title: '备品备件年度框采',
    budgetWan: 1200,
    bidders: [
      { name: '西北物资 A', ip: '10.0.1.2', mac: 'D1:11:22:33:44:55', quoteWan: 1100 },
      { name: '西北物资 B', ip: '10.0.1.3', mac: 'D2:11:22:33:44:66', quoteWan: 1120 },
    ],
    aiScore: 0.18,
  },
  {
    id: 'CG-2026-0102',
    companyId: 'c3',
    title: '大型锻件运输服务',
    budgetWan: 800,
    bidders: [
      { name: '晋运物流', ip: '192.168.2.10', mac: 'E0:E0:E0:00:01:01', quoteWan: 760 },
      { name: '华通运输', ip: '192.168.2.11', mac: 'E0:E0:E0:00:01:02', quoteWan: 775 },
    ],
    aiScore: 0.12,
  },
  {
    id: 'CG-2026-0300',
    companyId: 'c5',
    title: '土石方运输短名单',
    budgetWan: 450,
    bidders: [
      { name: '宏基物流', ip: '172.16.0.5', mac: 'AA:BB:CC:01:01:01', quoteWan: 430 },
      { name: '城通运输', ip: '172.16.0.6', mac: 'AA:BB:CC:01:01:02', quoteWan: 438 },
    ],
    aiScore: 0.25,
  },
  {
    id: 'CG-2026-0077',
    companyId: 'c6',
    title: '办公设备集中采购',
    budgetWan: 120,
    bidders: [
      { name: '供应商 X', ip: '10.8.1.1', mac: '01:02:03:04:05:06', quoteWan: 118 },
      { name: '供应商 Y', ip: '10.8.1.2', mac: '01:02:03:04:05:07', quoteWan: 119 },
    ],
    aiScore: 0.08,
  },
  {
    id: 'CG-2026-0299',
    companyId: 'c7',
    title: '云资源扩容采购',
    budgetWan: 260,
    bidders: [
      { name: '云服务商 A', ip: '192.168.50.1', mac: 'F0:F0:F0:00:00:01', quoteWan: 248 },
      { name: '云服务商 B', ip: '192.168.50.2', mac: 'F0:F0:F0:00:00:02', quoteWan: 255 },
    ],
    aiScore: 0.11,
  },
]

/** 热力图：板块 × 风险域 */
export function heatmapCells() {
  const domains = ['投资', '资金', '财务', '合同', '采购', '薪酬', '境外', '产权', '金融', '会计']
  const cells = []
  SECTORS.forEach((s, yi) => {
    domains.forEach((_, xi) => {
      const v = Math.round(30 + Math.sin(xi * 0.7 + yi) * 20 + (s.riskScore > 65 ? 15 : 0))
      cells.push([xi, yi, Math.min(100, Math.max(5, v))])
    })
  })
  return { domains, cells }
}

export const GRAPH_INVESTMENT = {
  nodes: [
    { id: 'n1', label: '集团', type: 'group' },
    { id: 'n2', label: '海外工程', type: 'company' },
    { id: 'n3', label: '东南亚 SPV', type: 'spv' },
    { id: 'n4', label: '当地分包 A', type: 'supplier' },
    { id: 'n5', label: '当地分包 B', type: 'supplier' },
    { id: 'n6', label: '高管亲属企业', type: 'related' },
  ],
  edges: [
    { source: 'n1', target: 'n2', label: '控股' },
    { source: 'n2', target: 'n3', label: '出资' },
    { source: 'n3', target: 'n4', label: '分包' },
    { source: 'n3', target: 'n5', label: '分包' },
    { source: 'n6', target: 'n4', label: '同一控制' },
  ],
}

export const GRAPH_PROCUREMENT = {
  nodes: [
    { id: 'p1', label: '盛通供应链', type: 'bidder' },
    { id: 'p2', label: '联创商贸', type: 'bidder' },
    { id: 'p3', label: '远航物资', type: 'bidder' },
    { id: 'p4', label: '自然人王某', type: 'person' },
  ],
  edges: [
    { source: 'p1', target: 'p2', label: '同 MAC' },
    { source: 'p2', target: 'p3', label: '同 MAC' },
    { source: 'p1', target: 'p4', label: '参股' },
    { source: 'p3', target: 'p4', label: '参股' },
  ],
}

export const GRAPH_CONTRACT = {
  nodes: [
    { id: 'c1', label: '城市基建投资', type: 'company' },
    { id: 'c2', label: '宏基土木集团', type: 'supplier' },
    { id: 'c3', label: '钢材贸易商', type: 'supplier' },
    { id: 'c4', label: 'CT-2026-0312', type: 'contract' },
  ],
  edges: [
    { source: 'c1', target: 'c4', label: '甲方' },
    { source: 'c2', target: 'c4', label: '乙方' },
    { source: 'c2', target: 'c3', label: '采购' },
  ],
}

// ===== 合同穿透详细数据 =====
// 合同全文模拟（截取关键条款）
export const CONTRACT_DETAILS = {
  'CT-2026-0312': {
    fullText: [
      { article: '第一条 合同标的', content: '甲方向乙方采购大型工业自动化生产线设备 3 套（含安装调试及人员培训），规格型号 IA-9000，总金额人民币 2.3 亿元。' },
      { article: '第二条 付款方式', content: '本合同约定：签约后 10 个工作日内支付合同总额的 100%（2.3 亿元）。⚠ 预付 100%，无分期保障，乙方无履约约束力。' },
      { article: '第三条 质保条款', content: '乙方对所供设备提供自验收合格之日起 12 个月的质保期。⚠ 注意：本合同未约定质保金扣留条款，质保期内乙方缺乏履约约束。' },
      { article: '第四条 交付与验收', content: '设备应于 2026 年 9 月 30 日前完成出厂验收，2026 年 12 月 31 日前完成安装调试及最终验收。' },
      { article: '第五条 违约责任', content: '乙方逾期交付，每日按合同总额 0.05% 支付违约金。⚠ 违约金上限未明确约定，存在争议风险。' },
      { article: '第六条 争议解决', content: '因本合同引起的争议，由合同签订地人民法院管辖。' },
      { article: '第七条 付款保障', content: '甲方已支付全部合同款项 2.3 亿元，乙方应按时保质完成设备交付与安装。⚠ 资金已全部付出，甲方失去了付款杠杆。' },
      { article: '第八条 不可抗力', content: '因不可抗力导致合同无法履行的，双方互不承担违约责任，但应及时通知对方并提供证明。' },
    ],
    aiExtraction: {
      partyA: '城市基建投资公司',
      partyB: '宏基土木集团',
      amountYi: 2.3,
      signDate: '2026-03-12',
      expireDate: '2027-06-30',
      keyHighlights: [
        { label: '合同金额', value: '2.3 亿元', risk: false },
        { label: '付款条件', value: '⚠ 签约后预付 100%', risk: true, riskNote: '无分期保障，甲方失去付款杠杆' },
        { label: '质保金', value: '❌ 未约定质保金', risk: true, riskNote: '行业惯例应扣留 5-10% 质保金' },
        { label: '违约责任', value: '⚠ 违约金上限未明确', risk: true, riskNote: '乙方逾期交付违约金上限模糊' },
        { label: '资金风险', value: '⚠ 资金已 100% 付出', risk: true, riskNote: '甲方丧失履约制衡手段' },
        { label: '整体风险等级', value: '高风险', risk: true },
      ],
    },
    riskClauses: [
      {
        clause: '第二条 · 预付 100%，无分期保障',
        risk: 'critical',
        analysis: '合同约定签约后 10 个工作日内支付全部款项 2.3 亿元，属于极为罕见的 100% 预付条款。行业惯例大型设备采购通常采用 30%-30%-30%-10% 分阶段付款，以保留履约制衡手段。此项条款导致甲方在设备交付前已失去全部资金杠杆。',
        suggestion: '建议紧急修改付款方式为分阶段支付：签约付 30%、出厂验收付 30%、安装完成付 30%、质保期满付 10%。如乙方不同意，应立即冻结合同执行并启动法务核查。',
      },
      {
        clause: '第三条 · 缺失质保金条款',
        risk: 'high',
        analysis: '合同未约定质保金扣留机制。大型设备采购行业惯例应扣留合同总额 5-10%（约 1,150-2,300 万元）作为质量保证金，质保期满后支付。无质保金意味着乙方在质保期内缺乏履约约束，设备质量问题无法通过资金手段制衡。',
        suggestion: '建议增加质保金条款：扣留合同总额 8%（1,840 万元）作为质保金，质保期满后 30 日内无息退还。',
      },
    ],
    performance: {
      deliverables: [
        { item: '设备设计图纸提交', planned: '2026-03-30', actual: '2026-04-15', done: true, delay: 16 },
        { item: '设备出厂验收', planned: '2026-09-30', actual: '-', done: false },
        { item: '安装调试', planned: '2026-11-30', actual: '-', done: false },
        { item: '最终验收', planned: '2026-12-31', actual: '-', done: false },
      ],
      payments: [
        { phase: '签约全额付款（100%）', amountYi: 2.3, planned: '2026-03-22', actual: '2026-03-22', paid: true },
      ],
      totalPaidYi: 2.3,
      totalContractYi: 2.3,
      paidPercent: 100,
      deliveryPercent: 60, // 设计图已提交，但生产未验收，进度仅60%
      overpaymentWarning: true,
    },
    // 关联采购订单
    relatedProcurement: { id: 'CG-2026-0300', title: '土石方运输短名单', matchNote: '同一乙方关联订单，物资采购重叠' },
    relatedContracts: [{ id: 'CT-2025-4412', name: '境外分包框架协议', relation: '宏基土木同时为该合同的乙方' }],
  },
  'CT-2026-0098': {
    fullText: [
      { article: '第一条 合同标的', content: '甲方向乙方采购动力煤 120 万吨（长协），单价按环渤海动力煤指数 + 升贴水浮动，预估总额 2.1 亿元。' },
      { article: '第二条 付款方式', content: '按月结算，每月 10 日前支付上月实际发运量的 95%，剩余 5% 作为质保金。' },
      { article: '第三条 质量标准', content: '收到基低位发热量 ≥ 5,500kcal/kg，全硫 ≤ 1.0%。' },
      { article: '第四条 交付', content: '2026 年 1 月 - 2026 年 12 月，月度均匀发运。' },
    ],
    aiExtraction: {
      partyA: '华东电力有限公司', partyB: '北方能源贸易', amountYi: 2.1, signDate: '2025-12-20', expireDate: '2026-12-31',
      keyHighlights: [
        { label: '合同金额', value: '2.1 亿元（浮动）', risk: false },
        { label: '付款条件', value: '月度结算，扣 5% 质保金', risk: false },
        { label: '整体风险等级', value: '低风险', risk: false },
      ],
    },
    riskClauses: [],
    performance: {
      deliverables: [
        { item: '1-3 月发运', planned: '30万吨', actual: '31万吨', done: true },
        { item: '4-6 月发运', planned: '30万吨', actual: '28万吨', done: false, delay: 2 },
        { item: '7-9 月发运', planned: '30万吨', actual: '-', done: false },
        { item: '10-12 月发运', planned: '30万吨', actual: '-', done: false },
      ],
      payments: [
        { phase: '1-3 月结算', amountYi: 0.52, planned: '2026-04', actual: '2026-04-10', paid: true },
        { phase: '4 月结算', amountYi: 0.16, planned: '2026-05', actual: '-', paid: false },
      ],
      totalPaidYi: 0.52, totalContractYi: 2.1, paidPercent: 25, deliveryPercent: 49,
      overpaymentWarning: false,
    },
    relatedProcurement: null, relatedContracts: [],
  },
}

// AI NLP 解析步骤（流式展示用）
export const CONTRACT_NLP_STEPS = {
  parse: ['正在加载合同文本... OCR 识别完成，共 8 条 2,860 字', 'NLP 实体识别：提取合同主体... 甲方：城市基建投资公司，乙方：宏基土木集团', '关键要素提取：金额 2.3 亿、签署日期 2026-03-12、到期日 2027-06-30', '条款结构分析：识别 8 个条款，分类为：标的、付款、质保、交付、违约、争议、资金保障、不可抗力', '风险模式匹配：正在比对 120+ 风险规则库...'],
  analyze: ['规则 R-0003 命中：预付比例异常。合同约定签约后 100% 预付，行业惯例 ≤30%，差异度 70%', '规则 R-0017 命中：质保金缺失。行业惯例大型设备采购需预留 5-10% 质保金，本合同未约定', '规则 R-0055 命中：违约金上限未明确。逾期交付违约金日费率 0.05% 但未设上限，存在无限罚则风险', '综合风险评分：85/100（重大风险）。建议：(1) 紧急修改付款方式为分阶段 (2) 补充质保金条款 (3) 明确违约金上限'],
  audit: ['法务复核：100% 预付条款极为罕见，需排查是否存在利益输送或合谋', '审计建议：质保金建议扣留 8%（1,840 万），质保期 12 个月', '风控建议：冻结后续履约，待合同条款修订后再恢复执行'],
  performance: ['履约监控：合同进度 60%（仅完成设计图），但已付款 100%（2.3 亿/2.3 亿）', '⚠ 重大超付预警：付款进度（100%）超前于实际交付进度（60%）达 40 个百分点', '建议：立即暂停合同执行，通知采购部冻结后续履约，待条款整改后恢复'],
  workOrder: ['根据 NLP 解析结果自动生成核查工单...', '工单摘要：CT-2026-0312 预付100%+质保金缺失+违约金无上限', '建议责任人：法务部-周某、采购部-陈某', '建议处置时限：2026-05-28（10 个工作日），紧急等级：重大'],
}

// 供应商画像数据
export const SUPPLIER_PROFILE = {
  '宏基土木集团': {
    name: '宏基土木集团',
    regCapital: '8.5 亿',
    established: '2008',
    employees: '2,300+',
    rating: 'AA',
    cooperationYears: 6,
    totalContractAmount: '28.6 亿',
    historicalIssues: [
      { date: '2025-Q3', issue: '某市政项目工期延误 45 天', resolved: true },
      { date: '2024-Q2', issue: '钢材采购合同争议（已和解）', resolved: true },
    ],
    riskFlags: ['近 12 个月中标率异常偏高（同板块 68%）', '与城市基建投资公司签约集中度高'],
  },
}

export const CONTRACT_COMMAND_CENTER = {
  title: 'AI 合同智能解析中心',
  refreshText: '数据已刷新 12 秒前',
  sceneTabs: ['设备采购', '工程施工', '服务合作'],
  defaultContractId: 'HT-2026-0588',
  kpis: [
    { label: '合同总数', value: 216, unit: '份', status: 'normal', icon: 'file', trend: [128, 136, 149, 162, 188, 216] },
    { label: '合同总金额', value: 98.64, unit: '亿元', status: 'normal', icon: 'amount', trend: [42.8, 51.2, 63.5, 74.3, 86.2, 98.64] },
    { label: '高风险合同', value: 7, unit: '份', status: 'high', icon: 'risk', trend: [2, 3, 3, 4, 6, 7] },
    { label: '待法务审核', value: 19, unit: '份', status: 'watch', icon: 'legal', trend: [11, 12, 14, 15, 17, 19] },
    { label: '逾期履约合同', value: 12, unit: '份', status: 'medium', icon: 'delay', trend: [4, 5, 6, 8, 10, 12] },
    { label: '本月新增合同', value: 34, unit: '份', status: 'normal', icon: 'new', trend: [8, 12, 15, 18, 24, 34] },
  ],
  riskDistribution: [
    { name: '高风险', value: 5, color: '#f53f3f' },
    { name: '中风险', value: 12, color: '#ff8800' },
    { name: '关注', value: 24, color: '#facc16' },
    { name: '正常', value: 59, color: '#22c55e' },
  ],
  statusDistribution: [
    { name: '正常履约', value: 132, color: '#22c55e' },
    { name: '待审核', value: 19, color: '#facc16' },
    { name: '已逾期', value: 12, color: '#ff8800' },
    { name: '预警中', value: 27, color: '#f53f3f' },
    { name: '已归档', value: 26, color: '#0ea5e9' },
  ],
  progressNodes: ['签约', '预付款', '图纸交付', '设备到场', '安装调试', '最终验收'],
  progressDelivery: [0, 12, 25, 38, 60, 60],
  progressPayment: [0, 100, 100, 100, 100, 100],
  progressAmountYi: [0, 2.3, 2.3, 2.3, 2.3, 2.3],
  contracts: [
    {
      id: 'HT-2026-0588',
      scene: '设备采购',
      name: '设备采购合同',
      company: '城市基建投资公司',
      supplier: '宏基土木集团',
      amountYi: 2.3,
      signDate: '2026-03-12',
      riskLevel: 'high',
      status: '预警中',
      cycle: '2026-03-12 ~ 2027-06-30',
      paymentMethod: '签订后 3 日内支付 100% 预付款',
      warrantyStatus: '未设置质保金',
      legalReview: '未审核',
      deliveryProgress: 60,
      paymentProgress: 100,
      badge: '默认演示',
      abnormal: ['无质保金', '100%预付', '无法务审核', '超付款进度'],
    },
    {
      id: 'HT-2026-0472',
      scene: '工程施工',
      name: '输煤栈桥加固合同',
      company: '华东电力有限公司',
      supplier: '北方能源工程',
      amountYi: 1.12,
      signDate: '2026-02-08',
      riskLevel: 'medium',
      status: '待审核',
      cycle: '2026-02-08 ~ 2026-11-30',
      paymentMethod: '30/40/20/10 分期付款',
      warrantyStatus: '已设置 8% 质保金',
      legalReview: '待审核',
      deliveryProgress: 48,
      paymentProgress: 45,
      badge: '待法务',
      abnormal: ['待法务审核'],
    },
    {
      id: 'HT-2026-0316',
      scene: '设备采购',
      name: '风电场箱变采购框架',
      company: '西北新能源投资公司',
      supplier: '远晟电气设备',
      amountYi: 3.86,
      signDate: '2026-01-18',
      riskLevel: 'watch',
      status: '正常履约',
      cycle: '2026-01-18 ~ 2026-12-30',
      paymentMethod: '20/50/20/10 分期付款',
      warrantyStatus: '已设置 10% 质保金',
      legalReview: '已审核',
      deliveryProgress: 68,
      paymentProgress: 58,
      badge: '重点关注',
      abnormal: ['供应商集中度偏高'],
    },
    {
      id: 'HT-2025-1190',
      scene: '工程施工',
      name: '海外营地建设总包合同',
      company: '海外工程总承包公司',
      supplier: '境外分包联合体',
      amountYi: 4.2,
      signDate: '2025-12-26',
      riskLevel: 'high',
      status: '已逾期',
      cycle: '2025-12-26 ~ 2026-10-31',
      paymentMethod: '40/40/20',
      warrantyStatus: '未设置履约保函',
      legalReview: '已审核',
      deliveryProgress: 52,
      paymentProgress: 78,
      badge: '逾期履约',
      abnormal: ['节点逾期', '预警中'],
    },
    {
      id: 'HT-2026-0644',
      scene: '服务合作',
      name: '数字化运维服务合同',
      company: '数字科技公司',
      supplier: '杭州云联科技',
      amountYi: 0.84,
      signDate: '2026-04-02',
      riskLevel: 'normal',
      status: '已归档',
      cycle: '2026-04-02 ~ 2026-12-31',
      paymentMethod: '按月结算',
      warrantyStatus: '服务类不适用',
      legalReview: '已审核',
      deliveryProgress: 100,
      paymentProgress: 100,
      badge: '已归档',
      abnormal: [],
    },
    {
      id: 'HT-2026-0721',
      scene: '服务合作',
      name: '智慧安监平台运维服务合同',
      company: '数字科技公司',
      supplier: '星图软件服务',
      amountYi: 1.46,
      signDate: '2026-04-18',
      riskLevel: 'watch',
      status: '正常履约',
      cycle: '2026-04-18 ~ 2027-04-17',
      paymentMethod: '20/40/30/10 分期付款',
      warrantyStatus: '已设置服务质保考核',
      legalReview: '已审核',
      deliveryProgress: 72,
      paymentProgress: 52,
      badge: '平台运维',
      abnormal: ['需求变更频繁', '服务里程碑密集'],
    },
    {
      id: 'HT-2026-0386',
      scene: '设备采购',
      name: '主变压器成套采购合同',
      company: '华东电力有限公司',
      supplier: '远东重电制造',
      amountYi: 5.18,
      signDate: '2026-02-26',
      riskLevel: 'medium',
      status: '预警中',
      cycle: '2026-02-26 ~ 2027-02-28',
      paymentMethod: '30/30/30/10 分期付款',
      warrantyStatus: '已设置 10% 质保金',
      legalReview: '已审核',
      deliveryProgress: 46,
      paymentProgress: 62,
      badge: '设备到货延期',
      abnormal: ['到货延期', '付款进度略快'],
    },
    {
      id: 'HT-2026-0551',
      scene: '工程施工',
      name: '片区道路及管廊施工合同',
      company: '城市基建投资公司',
      supplier: '城建路桥集团',
      amountYi: 6.74,
      signDate: '2026-03-06',
      riskLevel: 'high',
      status: '预警中',
      cycle: '2026-03-06 ~ 2027-08-30',
      paymentMethod: '25/25/25/15/10 分期付款',
      warrantyStatus: '已设置履约保函',
      legalReview: '已审核',
      deliveryProgress: 41,
      paymentProgress: 58,
      badge: '产值偏离',
      abnormal: ['产值确认偏快', '现场签证偏多'],
    },
  ],
  contractDetails: {
    'HT-2026-0588': {
      basicInfo: {
        name: '设备采购合同',
        id: 'HT-2026-0588',
        amount: '2.30 亿元',
        supplier: '宏基土木集团',
        signDate: '2026-03-12',
        cycle: '2026-03-12 ~ 2027-06-30',
        paymentMethod: '签订后 3 日内支付 100% 预付款',
        warranty: '未设置质保金',
        legalReview: '未经法务审核即生效',
      },
      clauses: [
        { article: '第二条 付款方式', text: '合同签订后 3 日内支付 100% 预付款。', risk: true, tag: '高风险' },
        { article: '第三条 履约保障', text: '本合同不设置质保金、不设置履约保函。', risk: true, tag: '高风险' },
        { article: '第五条 违约责任', text: '甲方逾期交付不承担违约责任。', risk: true, tag: '高风险' },
        { article: '第七条 生效条件', text: '合同未经法务部审核即生效。', risk: true, tag: '高风险' },
        { article: '第一条 合同标的', text: '采购 IA-9000 自动化生产线设备 3 套，总金额 2.3 亿元。', risk: false, tag: '' },
      ],
      compliance: [
        {
          level: '高风险',
          violated: '100% 预付款条款',
          rule: '违反《集团合同管理办法》第12条',
          basis: '大型设备采购原则上不允许一次性全额预付，预付款比例应控制在 30% 以内。',
          suggestion: '立即暂停剩余执行动作，改为 30/30/30/10 分阶段支付。',
        },
        {
          level: '高风险',
          violated: '未设置质保金与履约保函',
          rule: '违反《设备采购内控指引》第8条',
          basis: '重大采购合同必须配置质保金或履约担保以覆盖履约风险。',
          suggestion: '补充 8% 质保金与履约保函条款，未落实前禁止继续验收入账。',
        },
        {
          level: '高风险',
          violated: '未经法务审核即生效',
          rule: '违反《法务前置审查制度》第5条',
          basis: '金额超过 5000 万元的合同必须完成法务审核后方可签署生效。',
          suggestion: '立即补做法务复核并追责，冻结后续审批权限。',
        },
      ],
      conclusion: {
        level: '特级预警',
        summary: [
          '合同存在 100% 预付款且无质保金，属于极高风险合同。',
          '付款进度远超交付进度，已形成资金损失风险敞口。',
          '合同未经法务审核即生效，违反集团合同管理规定。',
        ],
        advice: '建议立即暂停付款，启动合同重审流程，并同步生成预警工单。',
      },
    },
    'HT-2026-0472': {
      basicInfo: {
        name: '输煤栈桥加固合同',
        id: 'HT-2026-0472',
        amount: '1.12 亿元',
        supplier: '北方能源工程',
        signDate: '2026-02-08',
        cycle: '2026-02-08 ~ 2026-11-30',
        paymentMethod: '30/40/20/10 分期付款',
        warranty: '已设置 8% 质保金',
        legalReview: '法务待审核',
      },
      clauses: [
        { article: '第二条 付款安排', text: '首付款 30%，主体加固完成后累计支付至 70%。', risk: false, tag: '' },
        { article: '第三条 变更签证', text: '现场签证需经项目、造价、法务三方复核后生效。', risk: true, tag: '待审核' },
        { article: '第五条 延误责任', text: '工期延误超过 7 日需触发专项复盘。', risk: false, tag: '' },
      ],
      compliance: [
        {
          level: '中风险',
          violated: '法务审查尚未闭环',
          rule: '《法务前置审查制度》第5条',
          basis: '合同已启动执行但法务终审意见尚未归档。',
          suggestion: '补齐法务审查与归档流程，避免后续签证争议。',
        },
      ],
      conclusion: {
        level: '中风险',
        summary: ['合同履约节奏总体可控。', '当前主要风险集中在法务归档未闭环。'],
        advice: '建议在下一次进度款支付前完成法务补审。',
      },
    },
    'HT-2026-0316': {
      basicInfo: {
        name: '风电场箱变采购框架',
        id: 'HT-2026-0316',
        amount: '3.86 亿元',
        supplier: '远晟电气设备',
        signDate: '2026-01-18',
        cycle: '2026-01-18 ~ 2026-12-30',
        paymentMethod: '20/50/20/10 分期付款',
        warranty: '已设置 10% 质保金',
        legalReview: '法务已审核通过',
      },
      clauses: [
        { article: '第二条 供货计划', text: '按季度滚动交付箱变设备与现场服务。', risk: false, tag: '' },
        { article: '第四条 集中采购', text: '同一供应商年度集中度达到 36%，需持续跟踪。', risk: true, tag: '关注' },
        { article: '第六条 质量保障', text: '质保期 24 个月，保留 10% 质保金。', risk: false, tag: '' },
      ],
      compliance: [
        {
          level: '关注',
          violated: '供应商集中度偏高',
          rule: '《采购供应商管理办法》第14条',
          basis: '单一供应商在同类物资采购中的集中度偏高。',
          suggestion: '建议增加备选供应商，避免单点依赖。',
        },
      ],
      conclusion: {
        level: '关注',
        summary: ['合同整体合规。', '需重点跟踪供应商集中度与季度交付稳定性。'],
        advice: '建议保留月度供应商履约评估。 ',
      },
    },
    'HT-2025-1190': {
      basicInfo: {
        name: '海外营地建设总包合同',
        id: 'HT-2025-1190',
        amount: '4.20 亿元',
        supplier: '境外分包联合体',
        signDate: '2025-12-26',
        cycle: '2025-12-26 ~ 2026-10-31',
        paymentMethod: '40/40/20',
        warranty: '未设置履约保函',
        legalReview: '法务已审核通过',
      },
      clauses: [
        { article: '第三条 现场条件', text: '现场交付受属地审批影响，存在工期不确定性。', risk: true, tag: '高风险' },
        { article: '第五条 付款节点', text: '营地主体封顶后累计支付至 80%。', risk: false, tag: '' },
        { article: '第七条 履约担保', text: '未要求承包商提交履约保函。', risk: true, tag: '高风险' },
      ],
      compliance: [
        {
          level: '高风险',
          violated: '履约保函缺失',
          rule: '《海外工程项目合同风险指引》第9条',
          basis: '境外总包项目原则上应配置履约保函与保赔险。',
          suggestion: '补签履约担保补充协议并同步核查保险覆盖。',
        },
        {
          level: '高风险',
          violated: '履约进度逾期',
          rule: '《项目履约监控细则》第6条',
          basis: '当前现场进度低于计划节点 18 个百分点。',
          suggestion: '立即启动工期纠偏方案和驻场督办。',
        },
      ],
      conclusion: {
        level: '高风险',
        summary: ['境外项目现场进度落后明显。', '履约担保缺失导致违约追偿能力不足。'],
        advice: '建议立即启动驻场督办和补担保流程。',
      },
    },
    'HT-2026-0644': {
      basicInfo: {
        name: '数字化运维服务合同',
        id: 'HT-2026-0644',
        amount: '0.84 亿元',
        supplier: '杭州云联科技',
        signDate: '2026-04-02',
        cycle: '2026-04-02 ~ 2026-12-31',
        paymentMethod: '按月结算',
        warranty: '服务类不适用',
        legalReview: '法务已审核通过',
      },
      clauses: [
        { article: '第二条 服务范围', text: '7x24 平台巡检、告警处置与版本升级。', risk: false, tag: '' },
        { article: '第四条 验收机制', text: '按月验收，服务评分低于 90 分则扣减服务费。', risk: false, tag: '' },
      ],
      compliance: [
        {
          level: '正常',
          violated: '无重大异常',
          rule: '合同标准模板执行',
          basis: '验收、付款、审查流程完整。',
          suggestion: '持续按月归档验收资料即可。',
        },
      ],
      conclusion: {
        level: '正常',
        summary: ['合同模板规范，执行过程平稳。', '当前无异常预警。'],
        advice: '建议保持月度验收和日志留痕。',
      },
    },
    'HT-2026-0721': {
      basicInfo: {
        name: '智慧安监平台运维服务合同',
        id: 'HT-2026-0721',
        amount: '1.46 亿元',
        supplier: '星图软件服务',
        signDate: '2026-04-18',
        cycle: '2026-04-18 ~ 2027-04-17',
        paymentMethod: '20/40/30/10 分期付款',
        warranty: '已设置服务质保考核',
        legalReview: '法务已审核通过',
      },
      clauses: [
        { article: '第三条 里程碑考核', text: '每季度完成一次平台升级与攻防演练。', risk: false, tag: '' },
        { article: '第五条 需求变更', text: '重大需求变更需经集团信息化委员会审批。', risk: true, tag: '关注' },
      ],
      compliance: [
        {
          level: '关注',
          violated: '需求变更频繁',
          rule: '《信息化项目变更管理办法》第11条',
          basis: '近两个月累计提出 6 次范围调整申请。',
          suggestion: '建议冻结需求基线，按版本统一变更。',
        },
      ],
      conclusion: {
        level: '关注',
        summary: ['运维服务总体正常。', '需控制变更频率，避免影响交付验收。'],
        advice: '建议按季度开展服务质量复盘。',
      },
    },
    'HT-2026-0386': {
      basicInfo: {
        name: '主变压器成套采购合同',
        id: 'HT-2026-0386',
        amount: '5.18 亿元',
        supplier: '远东重电制造',
        signDate: '2026-02-26',
        cycle: '2026-02-26 ~ 2027-02-28',
        paymentMethod: '30/30/30/10 分期付款',
        warranty: '已设置 10% 质保金',
        legalReview: '法务已审核通过',
      },
      clauses: [
        { article: '第二条 供货节点', text: '首批设备应于 6 月底前到场，当前已延期 12 天。', risk: true, tag: '中风险' },
        { article: '第四条 付款节点', text: '设备制造完成前累计支付不超过 60%。', risk: false, tag: '' },
      ],
      compliance: [
        {
          level: '中风险',
          violated: '设备到货延期',
          rule: '《重大设备采购履约办法》第7条',
          basis: '第一批设备到货晚于计划 12 天。',
          suggestion: '建议对后续生产排期进行周监控。',
        },
      ],
      conclusion: {
        level: '中风险',
        summary: ['当前存在轻微延期，但付款与履约仍可控。'],
        advice: '建议强化供应商周例会与物流跟踪。',
      },
    },
    'HT-2026-0551': {
      basicInfo: {
        name: '片区道路及管廊施工合同',
        id: 'HT-2026-0551',
        amount: '6.74 亿元',
        supplier: '城建路桥集团',
        signDate: '2026-03-06',
        cycle: '2026-03-06 ~ 2027-08-30',
        paymentMethod: '25/25/25/15/10 分期付款',
        warranty: '已设置履约保函',
        legalReview: '法务已审核通过',
      },
      clauses: [
        { article: '第三条 现场签证', text: '现场签证累计已达合同额 9.6%，需专项复核。', risk: true, tag: '高风险' },
        { article: '第五条 计量确认', text: '月度产值确认由监理、造价、项目三方联合签认。', risk: true, tag: '高风险' },
      ],
      compliance: [
        {
          level: '高风险',
          violated: '现场签证偏多',
          rule: '《工程项目变更签证管理细则》第8条',
          basis: '签证金额接近预警阈值，且部分资料未闭环。',
          suggestion: '建议立即组织造价复核与抽样审计。',
        },
      ],
      conclusion: {
        level: '高风险',
        summary: ['现场签证与产值确认节奏偏快。', '需防范超计量与超付风险。'],
        advice: '建议暂停新增签证审批，先完成复核。',
      },
    },
  },
}

export const WORK_ORDERS = [
  { id: 'WO-2026-0042', riskId: 'R06', title: '围标串标核查', status: '整改中', owner: '审计部-李某', due: '2026-05-20' },
  { id: 'WO-2026-0037', riskId: 'R01', title: '境外项目投资超预算', status: '核查中', owner: '投资部-王某', due: '2026-05-18' },
  { id: 'WO-2026-0031', riskId: 'R02', title: '大额异常支付', status: '待验收', owner: '司库中心-赵某', due: '2026-05-10' },
  { id: 'WO-2026-0028', riskId: 'R05', title: '高风险合同条款', status: '已销号', owner: '法务部-周某', due: '2026-04-30' },
  { id: 'WO-2026-0046', riskId: 'R11', title: '陇东风电基地二期超预算核查', status: '待派单', owner: '投资管理部-张某', due: '2026-05-26' },
  { id: 'WO-2026-0047', riskId: 'R11', title: '陇东风电 EPC 关联交易核查', status: '核查中', owner: '审计部-陈某', due: '2026-05-24' },
  { id: 'WO-2026-0048', riskId: 'R01', title: '片区综合开发配套成本偏差复核', status: '整改中', owner: '投资管理部-刘某', due: '2026-05-22' },
]

export const RECTIFICATION_FLOW = [
  { step: 1, name: '风险识别', desc: '规则引擎 / AI 模型命中', done: true },
  { step: 2, name: '预警推送', desc: '消息中心 + 驾驶舱弹窗', done: true },
  { step: 3, name: '核查工单', desc: '派单、取证、结论', done: true },
  { step: 4, name: '限期整改', desc: '责任单位措施与材料', done: false },
  { step: 5, name: '验收销号', desc: '审计复核闭环', done: false },
]

export function companyById(id) {
  return COMPANIES.find((c) => c.id === id)
}

export function sectorById(id) {
  return SECTORS.find((s) => s.id === id)
}

// ========== 产权穿透 (PROPERTY) ==========
export const PROPERTY_TREE = {
  id: 'root',
  label: '集团公司',
  share: 100,
  children: [
    {
      id: 'p1', label: '华东电力有限公司', share: 100, type: 'direct',
      children: [
        { id: 'p1a', label: '华东电力新能源', share: 65, type: 'subsidiary' },
        { id: 'p1b', label: '某参股 SPV-A', share: 30, type: 'spv',
          children: [
            { id: 'p1b1', label: 'SPV-A1 (BVI)', share: 100, type: 'offshore',
              children: [
                { id: 'p1b2', label: 'SPV-A2 (开曼)', share: 100, type: 'offshore' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'p2', label: '海外工程总承包公司', share: 100, type: 'direct',
      children: [
        { id: 'p2a', label: '东南亚项目 SPV', share: 70, type: 'spv' },
        { id: 'p2b', label: '某有限合伙', share: 45, type: 'partnership' }
      ]
    },
    {
      id: 'p3', label: '重型装备集团', share: 85, type: 'direct',
      children: [
        { id: 'p3a', label: '装备制造子公司', share: 100, type: 'subsidiary' },
        { id: 'p3b', label: '某合资企业', share: 51, type: 'jv' }
      ]
    },
    {
      id: 'p4', label: '城市基建投资公司', share: 100, type: 'direct',
      children: [
        { id: 'p4a', label: '基建基金 LP', share: 40, type: 'fund' }
      ]
    },
    {
      id: 'p5', label: '集团财务公司', share: 100, type: 'direct'
    }
  ]
}

export const GRAPH_PROPERTY = {
  nodes: [
    { id: 'pr1', label: '集团公司', type: 'group' },
    { id: 'pr2', label: '华东电力', type: 'company' },
    { id: 'pr3', label: 'SPV-A1 (BVI)', type: 'spv' },
    { id: 'pr4', label: 'SPV-A2 (开曼)', type: 'spv' },
    { id: 'pr5', label: '某自然人控制', type: 'person' },
    { id: 'pr6', label: '某贸易公司', type: 'related' },
  ],
  edges: [
    { source: 'pr1', target: 'pr2', label: '100%' },
    { source: 'pr2', target: 'pr3', label: '30%→100%' },
    { source: 'pr3', target: 'pr4', label: '100%' },
    { source: 'pr5', target: 'pr6', label: '实控' },
    { source: 'pr6', target: 'pr2', label: '关联交易' },
  ]
}

export const PROPERTY_RISK_NODES = [
  { id: 'pr1', label: 'SPV-A1 (BVI)', level: 'high', path: '华东电力 → SPV-A → BVI', layers: 5, note: '5层嵌套，实控人待穿透' },
  { id: 'pr2', label: 'SPV-A2 (开曼)', level: 'high', path: '华东电力 → SPV-A → BVI → 开曼', layers: 5, note: '离岸多层架构' },
  { id: 'pr3', label: '某有限合伙', level: 'medium', path: '海外工程 → 有限合伙', layers: 3, note: 'LP 权益不透明' },
]

// ========== 财务穿透 (FINANCE) ==========
export const FINANCE_KPIS = [
  { label: '合并营业收入', value: '3,180 亿', trend: '+8.2%', warn: false },
  { label: '合并净利润', value: '286 亿', trend: '+5.1%', warn: false },
  { label: '资产负债率', value: '64.8%', trend: '+2.1pp', warn: false },
  { label: '管理费用同比', value: '+34%', trend: '↑', warn: true },
]

export const FINANCE_EXPENSES = [
  { id: 'F01', sector: '装备制造', company: '重型装备集团', account: '管理费用-业务招待费', budgetWan: 1800, actualWan: 2480, deviation: '+37.8%', level: 'high' },
  { id: 'F02', sector: '工程建设', company: '海外工程总承包公司', account: '管理费用-差旅费', budgetWan: 3200, actualWan: 4160, deviation: '+30%', level: 'medium' },
  { id: 'F03', sector: '电力能源', company: '华东电力有限公司', account: '管理费用-咨询费', budgetWan: 950, actualWan: 1380, deviation: '+45.3%', level: 'high' },
  { id: 'F04', sector: '金融服务', company: '集团财务公司', account: '管理费用-会议费', budgetWan: 420, actualWan: 588, deviation: '+40%', level: 'medium' },
  { id: 'F05', sector: '科创与其他', company: '数字科技公司', account: '管理费用-办公费', budgetWan: 360, actualWan: 486, deviation: '+35%', level: 'medium' },
]

export const FINANCE_VOUCHERS = [
  { id: 'V001', date: '2026-03-15', account: '管理费用-业务招待费', amountWan: 56, company: '重型装备集团', payee: '某高档餐饮', risk: true, riskNote: '餐费单笔过高' },
  { id: 'V002', date: '2026-03-22', account: '管理费用-咨询费', amountWan: 120, company: '华东电力有限公司', payee: '某咨询工作室', risk: true, riskNote: '收款方与高管关联' },
  { id: 'V003', date: '2026-04-01', account: '管理费用-差旅费', amountWan: 32, company: '海外工程总承包公司', payee: '某旅行社', risk: false, riskNote: '-' },
  { id: 'V004', date: '2026-04-08', account: '管理费用-业务招待费', amountWan: 48, company: '重型装备集团', payee: '某会所', risk: true, riskNote: '非工作日消费' },
]

export const GRAPH_FINANCE = {
  nodes: [
    { id: 'f1', label: '重型装备集团', type: 'company' },
    { id: 'f2', label: '某高档餐饮', type: 'supplier' },
    { id: 'f3', label: '某咨询工作室', type: 'supplier' },
    { id: 'f4', label: '高管张某', type: 'person' },
    { id: 'f5', label: '某会所', type: 'supplier' },
  ],
  edges: [
    { source: 'f1', target: 'f2', label: '高频支付' },
    { source: 'f1', target: 'f5', label: '非工作日消费' },
    { source: 'f4', target: 'f3', label: '参股' },
    { source: 'f3', target: 'f1', label: '收款' },
  ]
}

// ========== 薪酬穿透 (SALARY) ==========
export const SALARY_DATA = [
  { sector: '电力能源', totalSalaryWan: 128000, headcount: 12500, avgSalaryWan: 10.24, lastYearAvg: 9.82, deviation: '+4.3%', warn: false },
  { sector: '装备制造', totalSalaryWan: 86000, headcount: 9800, avgSalaryWan: 8.78, lastYearAvg: 8.12, deviation: '+8.1%', warn: true },
  { sector: '工程建设', totalSalaryWan: 72000, headcount: 8200, avgSalaryWan: 8.78, lastYearAvg: 7.68, deviation: '+14.3%', warn: true },
  { sector: '金融服务', totalSalaryWan: 28000, headcount: 1800, avgSalaryWan: 15.56, lastYearAvg: 14.80, deviation: '+5.1%', warn: false },
  { sector: '科创与其他', totalSalaryWan: 15000, headcount: 1200, avgSalaryWan: 12.50, lastYearAvg: 11.20, deviation: '+11.6%', warn: true },
]

export const SALARY_ANOMALIES = [
  { id: 'S01', company: '数字科技公司', account: '管理费用-技术服务费', payee: '某自然人王某', amountWan: 18, frequency: '月度固定', risk: '疑似变相薪酬', level: 'high' },
  { id: 'S02', company: '数字科技公司', account: '管理费用-劳务费', payee: '某自然人李某', amountWan: 22, frequency: '季度固定', risk: '疑似变相薪酬', level: 'high' },
  { id: 'S03', company: '华东电力有限公司', account: '应付职工薪酬-奖金', payee: '全体员工', amountWan: 860, frequency: '季度', risk: '奖金超预算', level: 'medium' },
  { id: 'S04', company: '重型装备集团', account: '管理费用-咨询费', payee: '某咨询公司', amountWan: 45, frequency: '月度', risk: '咨询服务费与薪酬重叠', level: 'medium' },
]

export const GRAPH_SALARY = {
  nodes: [
    { id: 's1', label: '数字科技公司', type: 'company' },
    { id: 's2', label: '王某', type: 'person' },
    { id: 's3', label: '李某', type: 'person' },
    { id: 's4', label: '某科技公司', type: 'supplier' },
    { id: 's5', label: '华东电力', type: 'company' },
  ],
  edges: [
    { source: 's1', target: 's2', label: '月度支付' },
    { source: 's1', target: 's3', label: '季度支付' },
    { source: 's2', target: 's4', label: '关联' },
    { source: 's3', target: 's4', label: '关联' },
  ]
}

// ========== 境外穿透 (OVERSEAS) ==========
export const OVERSEAS_ASSETS = [
  { country: '东南亚某国', assetsWan: 186000, accounts: 12, projects: 4, riskLevel: 'high', riskNote: '回款延迟 >45天' },
  { country: '中东某国', assetsWan: 92000, accounts: 6, projects: 2, riskLevel: 'medium', riskNote: '汇率波动' },
  { country: '非洲某国', assetsWan: 65000, accounts: 8, projects: 3, riskLevel: 'high', riskNote: 'ZZ风险' },
  { country: 'BVI/开曼', assetsWan: 38000, accounts: 5, projects: 0, riskLevel: 'medium', riskNote: 'SPV穿透待查' },
  { country: '欧洲某国', assetsWan: 24000, accounts: 3, projects: 1, riskLevel: 'low', riskNote: '-' },
]

export const OVERSEAS_ACCOUNTS = [
  { id: 'OA01', country: '东南亚某国', bank: 'Bangkok Bank', balanceWan: 86500, currency: 'USD', lastActivity: '2026-03-15', delay: true },
  { id: 'OA02', country: '东南亚某国', bank: '渣打银行(新加坡)', balanceWan: 31200, currency: 'SGD', lastActivity: '2026-04-20', delay: false },
  { id: 'OA03', country: '中东某国', bank: 'Emirates NBD', balanceWan: 48000, currency: 'AED', lastActivity: '2026-04-28', delay: false },
  { id: 'OA04', country: '非洲某国', bank: 'Ecobank', balanceWan: 22000, currency: 'XOF', lastActivity: '2026-02-10', delay: true },
]

export const OVERSEAS_PROJECTS = [
  { id: 'OP01', country: '东南亚某国', name: '某国路桥 PPP', contractYi: 12.4, progress: '72%', risk: '超预算18.6%', level: 'critical' },
  { id: 'OP02', country: '中东某国', name: '光伏 EPC 总包', contractYi: 8.2, progress: '45%', risk: '-', level: 'low' },
  { id: 'OP03', country: '非洲某国', name: '水电站扩建', contractYi: 5.6, progress: '38%', risk: 'ZZ风险', level: 'high' },
  { id: 'OP04', country: '欧洲某国', name: '风电技术合作', contractYi: 1.8, progress: '90%', risk: '-', level: 'low' },
]

export const GRAPH_OVERSEAS = {
  nodes: [
    { id: 'o1', label: '集团总部', type: 'group' },
    { id: 'o2', label: '海外工程公司', type: 'company' },
    { id: 'o3', label: '东南亚 SPV', type: 'spv' },
    { id: 'o4', label: '当地合资方', type: 'supplier' },
    { id: 'o5', label: '中东项目公司', type: 'company' },
    { id: 'o6', label: 'BVI 控股', type: 'offshore' },
  ],
  edges: [
    { source: 'o1', target: 'o2', label: '100%' },
    { source: 'o2', target: 'o3', label: '70%' },
    { source: 'o2', target: 'o5', label: '100%' },
    { source: 'o3', target: 'o4', label: '合资' },
    { source: 'o3', target: 'o6', label: '控股' },
  ]
}

// ========== 金融穿透 (BANKING) ==========
export const BANKING_OVERVIEW = [
  { id: 'B01', type: '同业拆借', counterparty: '某城商行', amountYi: 15, rate: '3.85%', maturity: '2026-08', risk: 'low' },
  { id: 'B02', type: '委托贷款', counterparty: '华东电力有限公司', amountYi: 8, rate: '4.20%', maturity: '2027-03', risk: 'low' },
  { id: 'B03', type: '债券投资', counterparty: '某地产集团', amountYi: 3.2, rate: '6.50%', maturity: '2026-12', risk: 'high', riskNote: '主体评级下调' },
  { id: 'B04', type: '融资租赁', counterparty: '重型装备集团', amountYi: 2.5, rate: '5.10%', maturity: '2028-06', risk: 'medium' },
  { id: 'B05', type: '理财产品', counterparty: '某股份制银行', amountYi: 5, rate: '3.20%', maturity: '2026-09', risk: 'low' },
]

export const BANKING_RISK_EXPOSURES = [
  { label: '信用风险敞口', value: '33.7 亿', limit: '50 亿', usage: '67.4%', warn: false },
  { label: '流动性覆盖率', value: '142%', limit: '≥100%', usage: '-', warn: false },
  { label: '不良资产率', value: '1.82%', limit: '≤3%', usage: '-', warn: false },
  { label: '单一客户集中度', value: '14.2%', limit: '≤15%', usage: '94.7%', warn: true },
]

export const GRAPH_BANKING = {
  nodes: [
    { id: 'b1', label: '集团财务公司', type: 'company' },
    { id: 'b2', label: '某城商行', type: 'supplier' },
    { id: 'b3', label: '某地产集团', type: 'related' },
    { id: 'b4', label: '华东电力', type: 'company' },
    { id: 'b5', label: '某股份制银行', type: 'supplier' },
  ],
  edges: [
    { source: 'b1', target: 'b2', label: '同业拆借' },
    { source: 'b1', target: 'b3', label: '债券投资⚠' },
    { source: 'b1', target: 'b4', label: '委托贷款' },
    { source: 'b1', target: 'b5', label: '理财' },
  ]
}

// ========== 会计穿透 (ACCOUNTING) ==========
export const ACCOUNTING_QUALITY = [
  { sector: '电力能源', score: 92, issues: 1, details: '折旧政策一致' },
  { sector: '装备制造', score: 85, issues: 2, details: '收入确认时点需统一' },
  { sector: '工程建设', score: 78, issues: 4, details: '完工百分比估算偏差' },
  { sector: '金融服务', score: 90, issues: 0, details: '-' },
  { sector: '科创与其他', score: 82, issues: 2, details: '研发支出资本化口径差异' },
]

export const ACCOUNTING_ENTRIES = [
  { id: 'E001', date: '2026-04-30', company: '海外工程总承包公司', entry: '借：工程施工 贷：应付账款', amountWan: 4200, risk: true, riskNote: '完工百分比与实际进度偏离 ≥15%' },
  { id: 'E002', date: '2026-04-28', company: '重型装备集团', entry: '借：应收账款 贷：主营业务收入', amountWan: 8600, risk: true, riskNote: '提前确认收入，合同尚未验收' },
  { id: 'E003', date: '2026-04-25', company: '华东电力有限公司', entry: '借：固定资产 贷：在建工程', amountWan: 12500, risk: false, riskNote: '转固手续完整' },
  { id: 'E004', date: '2026-04-22', company: '数字科技公司', entry: '借：研发支出-资本化 贷：银行存款', amountWan: 680, risk: true, riskNote: '资本化条件存疑，同行均费用化' },
]

