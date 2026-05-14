<template>
  <div class="view">
    <DrillStepBar v-model="step" :steps="steps" />

    <div v-if="step === 0" class="panel block">
      <h2 class="panel-title">集团资金全景池（演示）</h2>
      <p class="desc">演示账户 {{ ACCOUNTS.length }} 个样本；流水定时滚动模拟「动态」效果。</p>
      <div class="kpi-row">
        <div v-for="x in fundKpis" :key="x.label" class="mini panel">
          <div class="t">{{ x.label }}</div>
          <div class="v">{{ x.value }}</div>
        </div>
      </div>
      <div class="row">
        <EChart class="chart" :option="chartPool" />
        <EChart class="chart" :option="chartFlow" />
      </div>
    </div>

    <div v-else-if="step === 1" class="panel block">
      <h2 class="panel-title">按板块查看资金集中度</h2>
      <table class="data-table">
        <thead>
          <tr>
            <th>板块</th>
            <th>账户数（演示）</th>
            <th>余额规模（万元）</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in sectorFunds" :key="s.id" class="cursor-row" @click="pickSector(s)">
            <td>{{ s.name }}</td>
            <td>{{ s.acct }}</td>
            <td>{{ s.bal.toLocaleString() }}</td>
            <td><span class="link">下钻</span></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else-if="step === 2" class="panel block">
      <h2 class="panel-title">子公司：选择单位查看账户</h2>
      <table class="data-table">
        <thead>
          <tr>
            <th>单位</th>
            <th>账户数</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in companiesInSector" :key="c.id" class="cursor-row" @click="pickCompany(c)">
            <td>{{ c.name }}</td>
            <td>{{ accountsForCompany(c.id).length }}</td>
            <td><span class="link">下钻</span></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else-if="step === 3" class="panel block">
      <h2 class="panel-title">银行账户：{{ company?.name }}</h2>
      <table class="data-table">
        <thead>
          <tr>
            <th>账号</th>
            <th>银行</th>
            <th>类型</th>
            <th>余额(万元)</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="a in accountsForCompany(companyId)" :key="a.id" class="cursor-row" @click="pickAccount(a)">
            <td>{{ a.id }}</td>
            <td>{{ a.bank }}</td>
            <td>{{ a.type }}</td>
            <td :class="{ warn: a.riskFlag }">{{ a.balanceWan.toLocaleString() }}</td>
            <td><span class="link">穿透流水</span></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="panel block">
      <h2 class="panel-title">流水 / 凭证穿透</h2>
      <p class="desc">账户 {{ account?.id }} · {{ account?.bank }}。异常支付已标红，可跳转工单。</p>
      <table class="data-table">
        <thead>
          <tr>
            <th>时间</th>
            <th>付款方</th>
            <th>收款方</th>
            <th>金额(万元)</th>
            <th>合同引用</th>
            <th>风险</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="f in FUND_FLOWS" :key="f.id" :class="{ danger: f.risk }">
            <td>{{ f.time }}</td>
            <td>{{ f.from }}</td>
            <td>{{ f.to }}</td>
            <td>{{ f.amountWan.toLocaleString() }}</td>
            <td>{{ f.contractRef }}</td>
            <td>
              <span v-if="f.risk" class="link" @click="$router.push('/work-orders')">生成工单（演示）</span>
              <span v-else class="muted">—</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import DrillStepBar from '@/components/DrillStepBar.vue'
import EChart from '@/components/EChart.vue'
import { SECTORS, COMPANIES, ACCOUNTS, FUND_FLOWS, companyById } from '@/mock/index.js'

const steps = [
  { key: 'f0', label: '集团总览' },
  { key: 'f1', label: '业务板块' },
  { key: 'f2', label: '子公司' },
  { key: 'f3', label: '账户明细' },
  { key: 'f4', label: '流水/凭证' },
]

const step = ref(0)
const sectorId = ref(null)
const companyId = ref(null)
const accountId = ref(null)

const company = computed(() => companyById(companyId.value))
const account = computed(() => ACCOUNTS.find((a) => a.id === accountId.value))

function accountsForCompany(cid) {
  return ACCOUNTS.filter((a) => a.companyId === cid)
}

const sectorFunds = computed(() =>
  SECTORS.map((s) => {
    const comps = COMPANIES.filter((c) => c.sectorId === s.id)
    const acct = comps.reduce((n, c) => n + accountsForCompany(c.id).length, 0)
    const bal = comps.reduce((sum, c) => sum + accountsForCompany(c.id).reduce((x, a) => x + a.balanceWan, 0), 0)
    return { ...s, acct: acct || 210, bal: bal || 680000 }
  })
)

const companiesInSector = computed(() => COMPANIES.filter((c) => c.sectorId === sectorId.value))

const fundKpis = computed(() => [
  { label: '可归集资金（演示）', value: `${(2860).toLocaleString()} 万元` },
  { label: '受限资金占比', value: '12.4%' },
  { label: '今日大额笔数', value: `${tick.value}` },
  { label: '事前拦截队列', value: '3 笔' },
])

const tick = ref(16)
let timer
onMounted(() => {
  timer = setInterval(() => {
    tick.value = 14 + Math.floor(Math.random() * 8)
  }, 3000)
})
onUnmounted(() => clearInterval(timer))

const chartPool = computed(() => ({
  backgroundColor: 'transparent',
  tooltip: { trigger: 'item' },
  series: [
    {
      type: 'pie',
      radius: ['40%', '68%'],
      label: { color: '#e8f1ff' },
      data: SECTORS.map((s, i) => ({ name: s.name, value: [820, 540, 760, 320, 280][i] || 400 })),
      itemStyle: { borderColor: '#0c1c34', borderWidth: 2 },
    },
  ],
}))

const chartFlow = computed(() => ({
  backgroundColor: 'transparent',
  tooltip: { trigger: 'axis' },
  grid: { left: 36, right: 8, top: 20, bottom: 20 },
  xAxis: { type: 'category', data: ['T-5', 'T-4', 'T-3', 'T-2', 'T-1', '今日'], axisLabel: { color: '#8ba3c7' } },
  yAxis: { type: 'value', axisLabel: { color: '#8ba3c7' }, splitLine: { lineStyle: { color: 'rgba(59,130,246,0.12)' } } },
  series: [
    {
      type: 'line',
      smooth: true,
      areaStyle: { color: 'rgba(6,182,212,0.2)' },
      lineStyle: { color: '#06b6d4', width: 2 },
      data: [120, 132, 101, 144, 90, tick.value * 8],
    },
  ],
}))

function pickSector(s) {
  sectorId.value = s.id
  step.value = 2
}
function pickCompany(c) {
  companyId.value = c.id
  step.value = 3
}
function pickAccount(a) {
  accountId.value = a.id
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
  margin: 0 0 12px;
}
.kpi-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 14px;
}
.mini {
  padding: 12px;
}
.mini .t {
  font-size: 12px;
  color: var(--text-muted);
}
.mini .v {
  font-size: 18px;
  font-weight: 700;
  margin-top: 6px;
}
.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.chart {
  min-height: 260px;
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
.danger {
  background: rgba(239, 68, 68, 0.08);
}
@media (max-width: 900px) {
  .kpi-row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .row {
    grid-template-columns: 1fr;
  }
}
</style>