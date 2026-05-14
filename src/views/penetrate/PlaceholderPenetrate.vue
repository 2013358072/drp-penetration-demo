<template>
  <div class="panel block">
    <h2 class="panel-title">{{ title }}</h2>
    <p class="desc">
      本模块为<strong>首期占位页</strong>：已预留导航与版式，演示讲解时可说明「与已完成四大穿透模块同一套五级下钻与图谱能力，二期补齐业务假数据」。
    </p>
    <ul class="list">
      <li>统一交互：集团总览 → 板块 → 子公司 → 明细 → 单据/凭证</li>
      <li>统一风险色标：绿 / 黄 / 橙 / 红</li>
      <li>知识图谱：AntV G6（与投资/采购等页一致）</li>
    </ul>
    <div class="actions">
      <RouterLink class="btn" to="/investment">查看投资穿透（完整示例）</RouterLink>
      <RouterLink class="btn" to="/">返回驾驶舱</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const title = computed(() => route.meta?.title || '穿透模块')
</script>

<style scoped>
.block {
  padding: 20px 24px;
  max-width: 900px;
}
.desc {
  color: var(--text-muted);
  line-height: 1.7;
}
.list {
  color: var(--text-muted);
  line-height: 1.8;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}
.actions .btn {
  text-decoration: none;
}
</style>
