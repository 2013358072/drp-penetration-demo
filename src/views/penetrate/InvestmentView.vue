<template>
  <div class="view">
    <DrillStepBar v-model="step" :steps="steps" />

    <div v-if="step === 0" class="panel block">
      <h2 class="panel-title">集团投资总览（演示）</h2>
      <p class="desc">保留原有集团到项目的穿透链路，并在当前页面下方增加超预算与关联交易专题看板。</p>
      <div class="row">
        <EChart class="chart" :option="chart0" />
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>板块</th>
                <th>项目数</th>
                <th>风险热度</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="s in sectorAgg" :key="s.id" class="cursor-row" @click="openSector(s)">
                <td>{{ s.name }}</td>
                <td>{{ s.cnt }}</td>
                <td><RiskBadge :level="s.riskLevel" /></td>
                <td><span class="link">下钻</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <section class="section-gap">
        <div class="section-head">
          <div>
            <h3 class="sub-title">投资项目总览看板</h3>
            <p class="desc">聚焦总投资计划、已完成投资、项目总数和超预算项目，异常项目在图表中自动标红。</p>
          </div>
        </div>
        <div class="metric-grid">
          <div v-for="card in overviewCards" :key="card.label" class="metric-card" :class="{ danger: card.danger }">
            <span class="metric-label">{{ card.label }}</span>
            <strong class="metric-value">{{ card.value }}</strong>
            <span class="metric-extra">{{ card.extra }}</span>
          </div>
        </div>
        <div class="row">
          <EChart class="chart chart-tall" :option="sectorProgressOption" />
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>板块</th>
                  <th>项目完成率</th>
                  <th>预算(亿)</th>
                  <th>实际(亿)</th>
                  <th>超预算项目</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="s in sectorOverview" :key="s.id" class="cursor-row" @click="openSector(s)">
                  <td>{{ s.name }}</td>
                  <td>{{ s.avgProgress }}%</td>
                  <td>{{ fmtYi(s.totalBudget) }}</td>
                  <td :class="{ warn: s.totalActual > s.totalBudget }">{{ fmtYi(s.totalActual) }}</td>
                  <td :class="{ warn: s.overBudgetCount > 0 }">{{ s.overBudgetCount }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>

    <div v-else-if="step === 1" class="panel block">
      <h2 class="panel-title">板块：{{ sector?.name }}</h2>
      <p class="desc">选择子公司继续穿透，保留原有下钻路径。</p>
      <table class="data-table">
        <thead>
          <tr>
            <th>子公司</th>
            <th>所在地</th>
            <th>风险</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in companiesInSector" :key="c.id" class="cursor-row" @click="openCompany(c)">
            <td>{{ c.name }}</td>
            <td>{{ c.city }}</td>
            <td><RiskBadge :level="c.risk" /></td>
            <td><span class="link">下钻</span></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else-if="step === 2" class="panel block">
      <h2 class="panel-title">子公司：{{ company?.name }}</h2>
      <p class="desc">在保留原表格的基础上补充项目进度、预算偏差和风险等级，点击项目进入详情页。</p>
      <table class="data-table">
        <thead>
          <tr>
            <th>项目</th>
            <th>预算(亿)</th>
            <th>实际支出(亿)</th>
            <th>进度</th>
            <th>状态</th>
            <th>风险等级</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in projectsOfCompany" :key="p.id" class="cursor-row" @click="openProject(p)">
            <td>{{ p.name }}</td>
            <td>{{ fmtYi(p.budgetYi) }}</td>
            <td :class="{ warn: p.actualYi > p.budgetYi }">{{ fmtYi(p.actualYi) }}</td>
            <td>{{ p.progress }}%</td>
            <td :class="{ warn: p.actualYi > p.budgetYi }">{{ p.status }}</td>
            <td><RiskBadge :level="p.risk" /></td>
            <td><span class="link">查看详情</span></td>
          </tr>
        </tbody>
      </table>

      <section class="section-gap">
        <div class="section-head">
          <div>
            <h3 class="sub-title">项目详情与下钻</h3>
            <p class="desc">重点项目支持从列表直接下钻到预算对比、资金趋势、里程碑和关联图谱。</p>
          </div>
        </div>
        <div class="quick-list">
          <div v-for="p in projectsOfCompany" :key="`${p.id}-quick`" class="quick-item" @click="openProject(p)">
            <div>
              <div class="quick-title">{{ p.name }}</div>
              <div class="quick-meta">{{ p.location }} · {{ p.progress }}% · {{ p.milestoneStatus }}</div>
            </div>
            <div class="quick-side">
              <span class="quick-num" :class="{ warn: p.actualYi > p.budgetYi }">{{ budgetDeviationText(p) }}</span>
              <RiskBadge :level="p.risk" />
            </div>
          </div>
        </div>
      </section>
    </div>

    <div v-else-if="step === 3" class="panel block">
      <h2 class="panel-title">项目明细：{{ project?.name }}</h2>
      <div class="badges">
        <RiskBadge :level="project?.risk" />
        <span class="pill">阶段：{{ project?.phase }}</span>
        <span class="pill">进度：{{ projectProfile.progress }}%</span>
        <span class="pill">关联风险：{{ relatedRiskText }}</span>
      </div>

      <div class="metric-grid">
        <div class="metric-card">
          <span class="metric-label">预算 vs 实际</span>
          <strong class="metric-value">{{ fmtYi(project?.budgetYi) }} / {{ fmtYi(project?.actualYi) }} 亿</strong>
          <span class="metric-extra">{{ budgetDeviationText(project) }}</span>
        </div>
        <div class="metric-card" :class="{ danger: projectProfile.overBudgetRate > 0 }">
          <span class="metric-label">超预算偏差</span>
          <strong class="metric-value">{{ signedPercent(projectProfile.overBudgetRate) }}</strong>
          <span class="metric-extra">{{ projectProfile.causeAnalysis }}</span>
        </div>
        <div class="metric-card" :class="{ danger: relatedRiskLevel !== 'low' }">
          <span class="metric-label">关联交易金额 / 占比</span>
          <strong class="metric-value">{{ fmtYi(projectProfile.relatedTradeAmountYi) }} 亿 / {{ fmtPercent(projectProfile.relatedTradeRatio) }}</strong>
          <span class="metric-extra">{{ projectProfile.hiddenRelationNote }}</span>
        </div>
        <div class="metric-card">
          <span class="metric-label">里程碑状态</span>
          <strong class="metric-value">{{ projectProfile.milestoneStatus }}</strong>
          <span class="metric-extra">{{ projectProfile.location }} · {{ projectProfile.owner }}</span>
        </div>
      </div>

      <section class="section-gap">
        <div class="section-head">
          <div>
            <h3 class="sub-title">预算对比与资金使用趋势</h3>
            <p class="desc">展示预算 vs 实际对比图、月度资金使用趋势和关键里程碑节点。</p>
          </div>
          <button type="button" class="btn btn-primary" @click="goDocs">进入单据 / 凭证层</button>
        </div>
        <div class="row row-equal">
          <EChart class="chart chart-tall" :option="projectCompareOption" />
          <EChart class="chart chart-tall" :option="fundTrendOption" />
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>里程碑</th>
                <th>计划时间</th>
                <th>实际时间</th>
                <th>状态</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in projectProfile.milestones" :key="item.name">
                <td>{{ item.name }}</td>
                <td>{{ item.planned }}</td>
                <td>{{ item.actual }}</td>
                <td><span class="status-tag" :class="item.status">{{ milestoneLabel(item.status) }}</span></td>
                <td>{{ item.note }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="section-gap">
        <div class="section-head">
          <div>
            <h3 class="sub-title">关联交易知识图谱</h3>
            <p class="desc">展示项目主体、承包商和股东之间的关联关系，隐蔽关联方以红色节点高亮，点击节点可高亮关联路径。</p>
          </div>
          <RiskBadge :level="relatedRiskLevel" />
        </div>
        <div class="row row-equal">
          <KnowledgeGraph :graph-data="projectGraph" :height="320" />
          <div class="insight-card">
            <div class="insight-line">
              <span class="insight-k">关联交易金额</span>
              <strong class="insight-v">{{ fmtYi(projectProfile.relatedTradeAmountYi) }} 亿</strong>
            </div>
            <div class="insight-line">
              <span class="insight-k">关联交易占比</span>
              <strong class="insight-v">{{ fmtPercent(projectProfile.relatedTradeRatio) }}</strong>
            </div>
            <div class="insight-line">
              <span class="insight-k">隐蔽关联方</span>
              <strong class="insight-v">{{ projectProfile.hiddenRelationCount }} 个</strong>
            </div>
            <div class="insight-line">
              <span class="insight-k">自动计算风险</span>
              <strong class="insight-v">{{ relatedRiskText }}</strong>
            </div>
            <p class="insight-note">{{ projectProfile.hiddenRelationNote }}</p>
          </div>
        </div>
      </section>

      <section class="section-gap">
        <div class="section-head">
          <div>
            <h3 class="sub-title">风险预警卡片</h3>
            <p class="desc">复用风险标红和工单联动能力，点击可查看或派发核查工单。</p>
          </div>
        </div>
        <div class="alert-grid">
          <div v-for="alert in projectAlerts" :key="alert.id" class="alert-card" :class="alert.level">
            <div class="alert-top">
              <span class="alert-type">{{ alert.type }}</span>
              <RiskBadge :level="alert.level" />
            </div>
            <div class="alert-title">{{ alert.title }}</div>
            <div class="alert-detail">{{ alert.detail }}</div>
            <div class="alert-actions">
              <button type="button" class="btn" @click="openWorkOrders">查看工单</button>
              <button type="button" class="btn btn-primary" @click="dispatchWorkOrder(alert.workOrderId)">派发核查工单</button>
            </div>
          </div>
          <div v-if="!projectAlerts.length" class="alert-card neutral">
            <div class="alert-top">
              <span class="alert-type">运行状态</span>
              <RiskBadge level="low" />
            </div>
            <div class="alert-title">当前项目未触发新增预警</div>
            <div class="alert-detail">系统仍持续监测预算偏差、关联交易和关键节点变更，异常时可直接生成核查工单。</div>
            <div class="alert-actions">
              <button type="button" class="btn" @click="openWorkOrders">查看工单</button>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div v-else class="panel block">
      <h2 class="panel-title">单据与核查工单</h2>
      <p class="desc">在原有单据层基础上补充关联交易台账和预警工单入口，支持查看 / 派发核查工单。</p>
      <table class="data-table">
        <thead>
          <tr>
            <th>类型</th>
            <th>编号</th>
            <th>说明</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>可研批复</td>
            <td>KY-2024-0098</td>
            <td>批复投资上限 {{ fmtYi(project?.budgetYi) }} 亿元，当前完成度 {{ projectProfile.progress }}%</td>
            <td><span class="muted">查看（模拟）</span></td>
          </tr>
          <tr>
            <td>月度完成投资</td>
            <td>PM-2026-04</td>
            <td>累计实际 {{ fmtYi(project?.actualYi) }} 亿元，偏差 {{ signedPercent(projectProfile.overBudgetRate) }}</td>
            <td><span class="muted">查看（模拟）</span></td>
          </tr>
          <tr>
            <td>关联交易台账</td>
            <td>RT-2026-INV</td>
            <td>关联交易 {{ fmtYi(projectProfile.relatedTradeAmountYi) }} 亿元，占比 {{ fmtPercent(projectProfile.relatedTradeRatio) }}</td>
            <td><span class="muted">查看（模拟）</span></td>
          </tr>
          <tr
            v-for="alert in projectAlerts"
            :key="`${alert.id}-doc`"
            class="cursor-row"
            @click="openWorkOrders"
          >
            <td>核查工单</td>
            <td>{{ alert.workOrderId || '待生成' }}</td>
            <td>{{ alert.title }}</td>
            <td><span class="link">打开工单列表</span></td>
          </tr>
          <tr v-if="!projectAlerts.length" class="cursor-row" @click="openWorkOrders">
            <td>核查工单</td>
            <td>{{ fallbackWorkOrderId }}</td>
            <td>投资执行常规复核</td>
            <td><span class="link">打开工单列表</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import DrillStepBar from '@/components/DrillStepBar.vue'
import EChart from '@/components/EChart.vue'
import RiskBadge from '@/components/RiskBadge.vue'
import KnowledgeGraph from '@/components/KnowledgeGraph.vue'
import {
  SECTORS,
  COMPANIES,
  INVESTMENT_PROJECTS,
  INVESTMENT_PROJECT_PROFILES,
  INVESTMENT_RELATION_GRAPHS,
  GRAPH_INVESTMENT,
  WORK_ORDERS,
  sectorById,
  companyById,
} from '@/mock/index.js'

const router = useRouter()

const steps = [
  { key: 'g0', label: '集团总览' },
  { key: 'g1', label: '业务板块' },
  { key: 'g2', label: '子公司' },
  { key: 'g3', label: '项目明细' },
  { key: 'g4', label: '单据/工单' },
]

const riskRank = { critical: 4, high: 3, medium: 2, low: 1 }

const step = ref(0)
const sectorId = ref(null)
const companyId = ref(null)
const projectId = ref(null)

const projects = INVESTMENT_PROJECTS

const projectProfiles = computed(() =>
  projects.map((p) => {
    const profile = INVESTMENT_PROJECT_PROFILES[p.id] || buildFallbackProfile(p)
    return { ...p, ...profile }
  })
)

const sectorAgg = computed(() =>
  SECTORS.map((s) => {
    const list = projects.filter((p) => p.sectorId === s.id)
    const cnt = list.length
    const riskLevel = cnt ? list.map((p) => p.risk).reduce((a, b) => (riskRank[a] > riskRank[b] ? a : b)) : 'low'
    return { ...s, cnt, riskLevel }
  })
)

const sectorOverview = computed(() =>
  SECTORS.map((s) => {
    const list = projectProfiles.value.filter((p) => p.sectorId === s.id)
    const totalBudget = sumBy(list, 'budgetYi')
    const totalActual = sumBy(list, 'actualYi')
    const avgProgress = average(list.map((p) => p.progress))
    const overBudgetCount = list.filter((p) => p.actualYi > p.budgetYi).length
    const riskLevel = list.length ? list.map((p) => p.risk).reduce((a, b) => (riskRank[a] > riskRank[b] ? a : b)) : 'low'
    return { ...s, totalBudget, totalActual, avgProgress, overBudgetCount, riskLevel }
  }).filter((s) => s.totalBudget > 0)
)

const overviewCards = computed(() => {
  const totalBudget = sumBy(projects, 'budgetYi')
  const totalActual = sumBy(projects, 'actualYi')
  const overBudgetCount = projects.filter((p) => p.actualYi > p.budgetYi).length
  return [
    { label: '总投资计划', value: `${fmtYi(totalBudget)} 亿`, extra: '集团投资计划口径', danger: false },
    { label: '已完成投资', value: `${fmtYi(totalActual)} 亿`, extra: `完成率 ${fmtPercent((totalActual / totalBudget) * 100)}`, danger: false },
    { label: '项目总数', value: `${projects.length} 个`, extra: '覆盖当前演示子集', danger: false },
    { label: '超预算项目数', value: `${overBudgetCount} 个`, extra: '超预算项目已标红', danger: overBudgetCount > 0 },
  ]
})

const sector = computed(() => sectorById(sectorId.value))
const company = computed(() => companyById(companyId.value))
const project = computed(() => projects.find((p) => p.id === projectId.value) || projects[0])
const projectProfile = computed(() => INVESTMENT_PROJECT_PROFILES[project.value.id] || buildFallbackProfile(project.value))
const projectGraph = computed(() => INVESTMENT_RELATION_GRAPHS[project.value.id] || GRAPH_INVESTMENT)

const companiesInSector = computed(() => COMPANIES.filter((c) => c.sectorId === sectorId.value))
const projectsOfCompany = computed(() =>
  projectProfiles.value.filter((p) => p.companyId === companyId.value)
)

const relatedRiskLevel = computed(() => getRelatedRiskLevel(projectProfile.value))
const relatedRiskText = computed(() => riskText(relatedRiskLevel.value))
const projectAlerts = computed(() => projectProfile.value.alerts || [])
const fallbackWorkOrderId = computed(() => {
  const first = WORK_ORDERS.find((item) => item.riskId === 'R01')
  return first?.id || 'WO-2026-0037'
})

const chart0 = computed(() => ({
  backgroundColor: 'transparent',
  tooltip: { trigger: 'axis' },
  legend: { top: 0, textStyle: { color: '#8ba3c7' } },
  grid: { left: 40, right: 8, top: 36, bottom: 40 },
  xAxis: {
    type: 'category',
    data: projects.map((p) => shortName(p.name)),
    axisLabel: { color: '#8ba3c7', rotate: 25 },
  },
  yAxis: {
    type: 'value',
    axisLabel: { color: '#8ba3c7' },
    splitLine: { lineStyle: { color: 'rgba(59,130,246,0.12)' } },
  },
  series: [
    {
      name: '预算',
      type: 'bar',
      data: projects.map((p) => p.budgetYi),
      itemStyle: { color: '#3b82f6' },
    },
    {
      name: '实际',
      type: 'bar',
      data: projects.map((p) => ({
        value: p.actualYi,
        itemStyle: { color: p.actualYi > p.budgetYi ? '#ef4444' : '#22c55e' },
      })),
    },
  ],
}))

const sectorProgressOption = computed(() => ({
  backgroundColor: 'transparent',
  tooltip: { trigger: 'axis' },
  grid: { left: 48, right: 16, top: 24, bottom: 36 },
  xAxis: {
    type: 'category',
    data: sectorOverview.value.map((item) => item.name),
    axisLabel: { color: '#8ba3c7', interval: 0 },
  },
  yAxis: {
    type: 'value',
    max: 100,
    axisLabel: { color: '#8ba3c7', formatter: '{value}%' },
    splitLine: { lineStyle: { color: 'rgba(59,130,246,0.12)' } },
  },
  series: [
    {
      name: '项目完成率',
      type: 'bar',
      barWidth: 34,
      data: sectorOverview.value.map((item) => ({
        value: item.avgProgress,
        itemStyle: { color: item.overBudgetCount > 0 ? '#ef4444' : '#22c55e' },
      })),
    },
  ],
}))

const projectCompareOption = computed(() => ({
  backgroundColor: 'transparent',
  tooltip: { trigger: 'axis' },
  grid: { left: 40, right: 20, top: 30, bottom: 28 },
  xAxis: {
    type: 'category',
    data: ['预算', '实际', '关联交易'],
    axisLabel: { color: '#8ba3c7' },
  },
  yAxis: {
    type: 'value',
    axisLabel: { color: '#8ba3c7', formatter: '{value}亿' },
    splitLine: { lineStyle: { color: 'rgba(59,130,246,0.12)' } },
  },
  series: [
    {
      type: 'bar',
      barWidth: 34,
      data: [
        { value: project.value.budgetYi, itemStyle: { color: '#3b82f6' } },
        { value: project.value.actualYi, itemStyle: { color: project.value.actualYi > project.value.budgetYi ? '#ef4444' : '#22c55e' } },
        { value: projectProfile.value.relatedTradeAmountYi, itemStyle: { color: '#f97316' } },
      ],
      label: { show: true, position: 'top', color: '#e8f1ff' },
    },
  ],
}))

const fundTrendOption = computed(() => ({
  backgroundColor: 'transparent',
  tooltip: { trigger: 'axis' },
  legend: { top: 0, textStyle: { color: '#8ba3c7' } },
  grid: { left: 42, right: 12, top: 36, bottom: 24 },
  xAxis: {
    type: 'category',
    data: projectProfile.value.fundTrend.map((item) => item.month),
    axisLabel: { color: '#8ba3c7' },
  },
  yAxis: {
    type: 'value',
    axisLabel: { color: '#8ba3c7', formatter: '{value}亿' },
    splitLine: { lineStyle: { color: 'rgba(59,130,246,0.12)' } },
  },
  series: [
    {
      name: '预算累计',
      type: 'line',
      smooth: true,
      data: projectProfile.value.fundTrend.map((item) => item.budget),
      itemStyle: { color: '#3b82f6' },
      areaStyle: { color: 'rgba(59,130,246,0.12)' },
    },
    {
      name: '实际累计',
      type: 'line',
      smooth: true,
      data: projectProfile.value.fundTrend.map((item) => item.actual),
      itemStyle: { color: projectProfile.value.overBudgetRate > 0 ? '#ef4444' : '#22c55e' },
      areaStyle: { color: projectProfile.value.overBudgetRate > 0 ? 'rgba(239,68,68,0.12)' : 'rgba(34,197,94,0.12)' },
    },
  ],
}))

function buildFallbackProfile(p) {
  const progress = Math.max(35, Math.min(98, Math.round((p.actualYi / p.budgetYi) * 60)))
  return {
    progress,
    location: '演示区域',
    owner: companyById(p.companyId)?.name || '项目公司',
    board: sectorById(p.sectorId)?.name || '业务板块',
    milestoneStatus: '按计划推进',
    overBudgetRate: Number((((p.actualYi - p.budgetYi) / p.budgetYi) * 100).toFixed(1)),
    causeAnalysis: p.actualYi > p.budgetYi ? '阶段性支出高于计划，建议继续核查工程签证与采购清单。' : '项目执行基本平稳。',
    relatedTradeAmountYi: Number((p.actualYi * 0.12).toFixed(1)),
    relatedTradeRatio: Number(((p.actualYi * 0.12 / p.actualYi) * 100).toFixed(1)),
    hiddenRelationCount: p.risk === 'high' || p.risk === 'critical' ? 1 : 0,
    hiddenRelationNote: p.risk === 'high' || p.risk === 'critical' ? '存在需复核的关联交易链路。' : '未发现明显隐蔽关联。',
    fundTrend: [
      { month: '2026-01', budget: Number((p.budgetYi * 0.3).toFixed(1)), actual: Number((p.actualYi * 0.3).toFixed(1)) },
      { month: '2026-02', budget: Number((p.budgetYi * 0.55).toFixed(1)), actual: Number((p.actualYi * 0.57).toFixed(1)) },
      { month: '2026-03', budget: Number((p.budgetYi * 0.78).toFixed(1)), actual: Number((p.actualYi * 0.82).toFixed(1)) },
      { month: '2026-04', budget: p.budgetYi, actual: p.actualYi },
    ],
    milestones: [
      { name: '立项批复', planned: '2026-01-10', actual: '2026-01-10', status: 'done', note: '已完成' },
      { name: '开工建设', planned: '2026-02-15', actual: '2026-02-20', status: 'running', note: '持续推进' },
      { name: '阶段验收', planned: '2026-06-30', actual: '-', status: 'running', note: '待完成' },
    ],
    alerts: [],
  }
}

function openSector(s) {
  sectorId.value = s.id
  step.value = 1
}

function openCompany(c) {
  companyId.value = c.id
  step.value = 2
}

function openProject(p) {
  projectId.value = p.id
  step.value = 3
}

function goDocs() {
  step.value = 4
}

function openWorkOrders() {
  router.push('/work-orders')
}

function dispatchWorkOrder() {
  router.push('/work-orders')
}

function milestoneLabel(status) {
  if (status === 'done') return '已完成'
  if (status === 'delay') return '延期'
  return '进行中'
}

function getRelatedRiskLevel(profile) {
  let score = 0
  if (profile.relatedTradeRatio >= 30) score += 3
  else if (profile.relatedTradeRatio >= 15) score += 2
  else if (profile.relatedTradeRatio >= 8) score += 1

  if (profile.hiddenRelationCount >= 3) score += 3
  else if (profile.hiddenRelationCount >= 1) score += 2

  if (profile.overBudgetRate >= 10) score += 1
  if (score >= 6) return 'critical'
  if (score >= 4) return 'high'
  if (score >= 2) return 'medium'
  return 'low'
}

function riskText(level) {
  if (level === 'critical') return '重大'
  if (level === 'high') return '高'
  if (level === 'medium') return '中'
  return '低'
}

function budgetDeviationText(p) {
  if (!p) return '-'
  const rate = ((p.actualYi - p.budgetYi) / p.budgetYi) * 100
  return rate > 0 ? `超预算 ${fmtPercent(rate)}` : `节余 ${fmtPercent(Math.abs(rate))}`
}

function signedPercent(value) {
  const sign = value > 0 ? '+' : ''
  return `${sign}${fmtPercent(value)}`
}

function fmtYi(value) {
  return Number(value || 0).toFixed(1).replace(/\.0$/, '')
}

function fmtPercent(value) {
  return `${Number(value || 0).toFixed(1).replace(/\.0$/, '')}%`
}

function shortName(name) {
  return name.length > 8 ? `${name.slice(0, 8)}...` : name
}

function sumBy(list, key) {
  return list.reduce((sum, item) => sum + Number(item[key] || 0), 0)
}

function average(list) {
  if (!list.length) return 0
  return Math.round(list.reduce((sum, value) => sum + Number(value || 0), 0) / list.length)
}
</script>

<style scoped>
.view {
  max-width: 1600px;
}

.block {
  padding: 16px 20px;
}

.desc {
  color: var(--text-muted);
  font-size: 13px;
  margin: 0 0 16px;
  line-height: 1.6;
}

.section-gap {
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid rgba(148, 163, 184, 0.14);
}

.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.sub-title {
  margin: 0;
  font-size: 17px;
  font-weight: 600;
}

.row {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 16px;
  align-items: stretch;
}

.row-equal {
  grid-template-columns: 1fr 1fr;
}

.chart {
  min-height: 280px;
}

.chart-tall {
  min-height: 320px;
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 16px;
}

.metric-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 120px;
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.65);
}

.metric-card.danger {
  border-color: rgba(239, 68, 68, 0.45);
  box-shadow: inset 0 0 0 1px rgba(239, 68, 68, 0.12);
}

.metric-label {
  color: var(--text-muted);
  font-size: 12px;
}

.metric-value {
  font-size: 24px;
  color: #e8f1ff;
}

.metric-extra {
  color: #9fb4d6;
  font-size: 12px;
  line-height: 1.5;
}

.badges {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.pill {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  color: var(--text-muted);
}

.quick-list {
  display: grid;
  gap: 12px;
}

.quick-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 14px 16px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.5);
  cursor: pointer;
}

.quick-item:hover,
.alert-card:hover,
.insight-card:hover {
  border-color: rgba(59, 130, 246, 0.45);
}

.quick-title {
  font-size: 15px;
  font-weight: 600;
}

.quick-meta {
  margin-top: 4px;
  color: var(--text-muted);
  font-size: 12px;
}

.quick-side {
  display: flex;
  align-items: center;
  gap: 12px;
}

.quick-num {
  color: #e8f1ff;
  font-weight: 600;
}

.insight-card {
  padding: 18px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: rgba(15, 23, 42, 0.55);
}

.insight-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px dashed rgba(148, 163, 184, 0.16);
}

.insight-line:last-of-type {
  border-bottom: none;
}

.insight-k,
.muted {
  color: var(--text-muted);
}

.insight-v {
  color: #e8f1ff;
}

.insight-note {
  margin: 14px 0 0;
  color: #9fb4d6;
  line-height: 1.7;
  font-size: 13px;
}

.alert-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.alert-card {
  padding: 16px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: rgba(15, 23, 42, 0.58);
}

.alert-card.critical {
  border-color: rgba(239, 68, 68, 0.5);
  box-shadow: inset 0 0 0 1px rgba(239, 68, 68, 0.12);
}

.alert-card.high {
  border-color: rgba(249, 115, 22, 0.5);
}

.alert-card.neutral {
  grid-column: 1 / -1;
}

.alert-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.alert-type {
  color: var(--text-muted);
  font-size: 12px;
}

.alert-title {
  margin-top: 10px;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
}

.alert-detail {
  margin-top: 8px;
  color: #9fb4d6;
  line-height: 1.7;
  font-size: 13px;
}

.alert-actions,
.actions {
  display: flex;
  gap: 10px;
  margin-top: 16px;
  flex-wrap: wrap;
}

.status-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 62px;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  font-size: 12px;
}

.status-tag.done {
  color: var(--risk-green);
  border-color: rgba(34, 197, 94, 0.35);
}

.status-tag.delay {
  color: var(--risk-red);
  border-color: rgba(239, 68, 68, 0.35);
}

.status-tag.running {
  color: var(--risk-yellow);
  border-color: rgba(234, 179, 8, 0.35);
}

.btn {
  height: 34px;
  padding: 0 14px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: rgba(15, 23, 42, 0.75);
  color: #e8f1ff;
  cursor: pointer;
}

.btn-primary {
  border-color: rgba(59, 130, 246, 0.45);
  background: rgba(37, 99, 235, 0.2);
}

.link {
  color: var(--accent);
  cursor: pointer;
}

.warn {
  color: var(--risk-red);
  font-weight: 600;
}

@media (max-width: 1100px) {
  .metric-grid,
  .alert-grid,
  .row,
  .row-equal {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .section-head,
  .quick-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .quick-side {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
