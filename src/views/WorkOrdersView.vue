<template>
  <div class="panel block">
    <h2 class="panel-title">核查工单管理</h2>
    <p class="desc">演示数据：状态含待派单 / 核查中 / 整改中 / 待验收 / 已销号（前端静态）。</p>
    <div class="table-wrap">
      <table class="data-table">
        <thead>
          <tr>
            <th>工单号</th>
            <th>标题</th>
            <th>关联风险</th>
            <th>责任人</th>
            <th>截止日期</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="w in WORK_ORDERS" :key="w.id" class="cursor-row" @click="select = w.id">
            <td>{{ w.id }}</td>
            <td>{{ w.title }}</td>
            <td>{{ w.riskId }}</td>
            <td>{{ w.owner }}</td>
            <td>{{ w.due }}</td>
            <td>
              <span class="st" :class="cls(w.status)">{{ w.status }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-if="select" class="foot">已选中 {{ select }}（演示：可对接真实工单详情抽屉）。</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { WORK_ORDERS } from '@/mock/index.js'

const select = ref('')

function cls(s) {
  if (s === '已销号') return 'ok'
  if (s === '整改中' || s === '核查中') return 'run'
  return 'wait'
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
.st {
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 6px;
  border: 1px solid var(--border);
}
.st.ok {
  color: var(--risk-green);
  border-color: rgba(34, 197, 94, 0.35);
}
.st.run {
  color: var(--risk-orange);
  border-color: rgba(249, 115, 22, 0.35);
}
.st.wait {
  color: var(--risk-yellow);
  border-color: rgba(234, 179, 8, 0.35);
}
.foot {
  margin-top: 12px;
  font-size: 12px;
  color: var(--text-muted);
}
</style>
