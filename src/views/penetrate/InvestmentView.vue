<template>
  <div class="view">
    <DrillStepBar v-model="step" :steps="steps" />

    <!-- L0 集团 -->
    <div v-if="step === 0" class="panel block">
      <h2 class="panel-title">集团投资总览（演示）</h2>
      <p class="desc">在投项目 {{ projects.length }} 个（演示子集），异常项目已标红。点击板块下钻。</p>
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
    </div>

    <!-- L1 板块 -->
    <div v-else-if="step === 1" class="panel block">
      <h2 class="panel-title">板块：{{ sector?.name }}</h2>
      <p class="desc">选择子公司继续穿透。</p>
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

    <!-- L2 子公司 -> 实际是 step 2 公司项目列表，step 命名：0集团1板块2公司3项目4单据 -->
    <div v-else-if="step === 2" class="panel block">
      <h2 class="panel-title">子公司：{{ company?.name }}</h2>
      <table class="data-table">
        <thead>
          <tr>
            <th>项目</th>
            <th>预算(亿)</th>
            <th>实际(亿)</th>
            <th>状态</th>
            <th>风险</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in projectsOfCompany" :key="p.id" class="cursor-row" @click="openProject(p)">
            <td>{{ p.name }}</td>
            <td>{{ p.budgetYi }}</td>
            <td :class="{ warn: p.actualYi > p.budgetYi }">{{ p.actualYi }}</td>
            <td>{{ p.status }}</td>
            <td><RiskBadge :level="p.risk" /></td>
            <td><span class="link">下钻</span></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- L3 项目 -->
    <div v-else-if="step === 3" class="panel block">
      <h2 class="panel-title">项目明细：{{ project?.name }}</h2>
      <div class="badges">
        <RiskBadge :level="project?.risk" />
        <span class="pill">阶段：{{ project?.phase }}</span>
      </div>
      <KnowledgeGraph :graph-data="GRAPH_INVESTMENT" :height="300" />
      <p class="desc">知识图谱：投资链路 / 关联方（演示）。点击节点高亮关联路径。</p>
      <div class="actions">
        <button type="button" class="btn btn-primary" @click="goDocs">进入单据 / 凭证层</button>
      </div>
    </div>

    <!-- L4 单据 / 工单 -->
    <div v-else class="panel block">
      <h2 class="panel-title">单据与核查工单</h2>
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
            <td>批复投资上限 {{ project?.budgetYi }} 亿元</td>
            <td><span class="muted">查看（模拟）</span></td>
          </tr>
          <tr>
            <td>月度完成投资</td>
            <td>PM-2026-04</td>
            <td>累计实际 {{ project?.actualYi }} 亿元</td>
            <td><span class="muted">查看（模拟）</span></td>
          </tr>
          <tr class="cursor-row" @click="$router.push('/work-orders')">
            <td>核查工单</td>
            <td>WO-2026-0037</td>
            <td>投资超预算核查（与 R01 关联）</td>
            <td><span class="link">打开工单列表</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import DrillStepBar from '@/components/DrillStepBar.vue'
import EChart from '@/components/EChart.vue'
import RiskBadge from '@/components/RiskBadge.vue'
import KnowledgeGraph from '@/components/KnowledgeGraph.vue'
import { SECTORS, COMPANIES, INVESTMENT_PROJECTS, GRAPH_INVESTMENT, sectorById, companyById } from '@/mock/index.js'

const steps = [
  { key: 'g0', label: '集团总览' },
  { key: 'g1', label: '业务板块' },
  { key: 'g2', label: '子公司' },
  { key: 'g3', label: '项目明细' },
  { key: 'g4', label: '单据/工单' },
]

const step = ref(0)
const sectorId = ref(null)
const companyId = ref(null)
const projectId = ref(null)

const projects = INVESTMENT_PROJECTS

const sectorAgg = computed(() =>
  SECTORS.map((s) => {
    const list = projects.filter((p) => p.sectorId === s.id)
    const cnt = list.length
    const rank = { critical: 4, high: 3, medium: 2, low: 1 }
    const riskLevel = cnt ? list.map((p) => p.risk).reduce((a, b) => (rank[a] > rank[b] ? a : b)) : 'low'
    return { ...s, cnt, riskLevel }
  })
)

const sector = computed(() => sectorById(sectorId.value))
const company = computed(() => companyById(companyId.value))
const project = computed(() => projects.find((p) => p.id === projectId.value))

const companiesInSector = computed(() => COMPANIES.filter((c) => c.sectorId === sectorId.value))

const projectsOfCompany = computed(() => projects.filter((p) => p.companyId === companyId.value))

const chart0 = computed(() => ({
  backgroundColor: 'transparent',
  tooltip: { trigger: 'axis' },
  grid: { left: 40, right: 8, top: 24, bottom: 24 },
  xAxis: { type: 'category', data: projects.map((p) => p.name.slice(0, 8)), axisLabel: { color: '#8ba3c7', rotate: 25 } },
  yAxis: { type: 'value', axisLabel: { color: '#8ba3c7' }, splitLine: { lineStyle: { color: 'rgba(59,130,246,0.12)' } } },
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
}
.row {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 16px;
  align-items: stretch;
}
.chart {
  min-height: 280px;
}
.badges {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}
.pill {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  color: var(--text-muted);
}
.actions {
  margin-top: 16px;
}
.link {
  color: var(--accent);
  cursor: pointer;
}
.muted {
  color: var(--text-muted);
}
.warn {
  color: var(--risk-red);
  font-weight: 600;
}
@media (max-width: 900px) {
  .row {
    grid-template-columns: 1fr;
  }
}
</style>