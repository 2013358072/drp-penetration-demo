<template>
  <div class="view">
    <DrillStepBar v-model="step" :steps="steps" />

    <div v-if="step === 0" class="panel block">
      <h2 class="panel-title">采购招标全景（演示）</h2>
      <p class="desc">IP/MAC 碰撞、报价阶梯、股权关联 + AI 围标概率（前端写死）。</p>
      <EChart class="chart-wide" :option="chartBid" />
    </div>

    <div v-else-if="step === 1" class="panel block">
      <h2 class="panel-title">按板块</h2>
      <table class="data-table">
        <thead>
          <tr>
            <th>板块</th>
            <th>在途标段（演示）</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in SECTORS" :key="s.id" class="cursor-row" @click="pickSector(s)">
            <td>{{ s.name }}</td>
            <td>{{ 8 + s.projects }}</td>
            <td><span class="link">下钻</span></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else-if="step === 2" class="panel block">
      <h2 class="panel-title">子公司</h2>
      <table class="data-table">
        <thead>
          <tr>
            <th>单位</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in companiesInSector" :key="c.id" class="cursor-row" @click="pickCompany(c)">
            <td>{{ c.name }}</td>
            <td><span class="link">下钻</span></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else-if="step === 3" class="panel block">
      <h2 class="panel-title">标段列表：{{ company?.name }}</h2>
      <table class="data-table">
        <thead>
          <tr>
            <th>标段</th>
            <th>预算(万)</th>
            <th>AI 围标概率</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in packagesOfCompany" :key="p.id" class="cursor-row" @click="pickPkg(p)">
            <td>{{ p.id }} {{ p.title }}</td>
            <td>{{ p.budgetWan.toLocaleString() }}</td>
            <td><span :class="{ hot: p.aiScore > 0.8 }">{{ p.aiScore.toFixed(2) }}</span></td>
            <td><span class="link">穿透投标</span></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="panel block">
      <h2 class="panel-title">投标文件比对 · 关联图谱</h2>
      <p class="desc">标段 {{ pkg?.id }} — 三家 MAC 地址一致（演示假数据）。</p>
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>投标单位</th>
              <th>IP</th>
              <th>MAC</th>
              <th>报价(万)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(b, i) in pkg?.bidders || []" :key="i">
              <td>{{ b.name }}</td>
              <td>{{ b.ip }}</td>
              <td>{{ b.mac }}</td>
              <td>{{ b.quoteWan.toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <KnowledgeGraph :graph-data="GRAPH_PROCUREMENT" :height="300" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import DrillStepBar from '@/components/DrillStepBar.vue'
import EChart from '@/components/EChart.vue'
import KnowledgeGraph from '@/components/KnowledgeGraph.vue'
import { SECTORS, COMPANIES, PROCUREMENT_PACKAGES, GRAPH_PROCUREMENT, companyById } from '@/mock/index.js'

const steps = [
  { key: 'p0', label: '集团总览' },
  { key: 'p1', label: '业务板块' },
  { key: 'p2', label: '子公司' },
  { key: 'p3', label: '标段明细' },
  { key: 'p4', label: '投标/图谱' },
]

const step = ref(0)
const sectorId = ref(null)
const companyId = ref(null)
const packageId = ref(null)

const company = computed(() => companyById(companyId.value))
const pkg = computed(() => PROCUREMENT_PACKAGES.find((p) => p.id === packageId.value))

const companiesInSector = computed(() => COMPANIES.filter((c) => c.sectorId === sectorId.value))
const packagesOfCompany = computed(() => PROCUREMENT_PACKAGES.filter((p) => p.companyId === companyId.value))

const chartBid = computed(() => ({
  backgroundColor: 'transparent',
  tooltip: { trigger: 'axis' },
  grid: { left: 48, right: 8, top: 24, bottom: 56 },
  xAxis: { type: 'category', data: PROCUREMENT_PACKAGES.map((p) => p.id), axisLabel: { color: '#8ba3c7', rotate: 18 } },
  yAxis: { type: 'value', max: 100, axisLabel: { color: '#8ba3c7' }, splitLine: { lineStyle: { color: 'rgba(59,130,246,0.12)' } } },
  series: [
    {
      name: 'AI 围标概率(×100)',
      type: 'bar',
      data: PROCUREMENT_PACKAGES.map((p) => ({
        value: Math.round(p.aiScore * 100),
        itemStyle: { color: p.aiScore > 0.8 ? '#ef4444' : '#3b82f6' },
      })),
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
function pickPkg(p) {
  packageId.value = p.id
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
.chart-wide {
  min-height: 280px;
}
.link {
  color: var(--accent);
  cursor: pointer;
}
.hot {
  color: var(--risk-red);
  font-weight: 700;
}
</style>
