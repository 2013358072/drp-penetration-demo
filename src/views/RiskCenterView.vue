<template>
  <div class="panel block">
    <h2 class="panel-title">风险预警中心</h2>
    <p class="desc">10 类标准化风险样本已全部预置；点击行可跳转对应穿透模块（与驾驶舱一致）。</p>
    <div class="row">
      <EChart class="chart" :option="optBar" />
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>编号</th>
              <th>类型</th>
              <th>等级</th>
              <th>摘要</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in RISK_SAMPLES" :key="r.id" class="cursor-row" @click="go(r)">
              <td>{{ r.id }}</td>
              <td>{{ r.type }}</td>
              <td><RiskBadge :level="r.level" /></td>
              <td>{{ r.summary }}</td>
              <td><span class="link">打开穿透</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import EChart from '@/components/EChart.vue'
import RiskBadge from '@/components/RiskBadge.vue'
import { RISK_SAMPLES } from '@/mock/index.js'

const router = useRouter()

const types = computed(() => {
  const m = {}
  RISK_SAMPLES.forEach((r) => {
    m[r.type] = (m[r.type] || 0) + 1
  })
  return Object.keys(m).map((k) => ({ name: k, value: m[k] }))
})

const optBar = computed(() => ({
  backgroundColor: 'transparent',
  tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
  grid: { left: 120, right: 12, top: 8, bottom: 8 },
  xAxis: { type: 'value', axisLabel: { color: '#8ba3c7' }, splitLine: { lineStyle: { color: 'rgba(59,130,246,0.12)' } } },
  yAxis: { type: 'category', data: types.value.map((t) => t.name), axisLabel: { color: '#8ba3c7', fontSize: 11 } },
  series: [{ type: 'bar', data: types.value.map((t) => t.value), itemStyle: { color: '#3b82f6' } }],
}))

const routes = {
  investment: '/investment',
  funds: '/funds',
  finance: '/finance',
  property: '/property',
  contract: '/contract',
  procurement: '/procurement',
  salary: '/salary',
  overseas: '/overseas',
}

function go(r) {
  router.push(routes[r.scene] || '/')
}
</script>

<style scoped>
.block {
  padding: 16px 18px;
}
.desc {
  color: var(--text-muted);
  margin-bottom: 12px;
}
.row {
  display: grid;
  grid-template-columns: 0.9fr 1.4fr;
  gap: 12px;
  align-items: stretch;
}
.chart {
  min-height: 360px;
}
.link {
  color: var(--accent);
  cursor: pointer;
}
@media (max-width: 1000px) {
  .row {
    grid-template-columns: 1fr;
  }
}
</style>
