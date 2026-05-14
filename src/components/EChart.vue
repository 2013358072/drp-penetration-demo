<template>
  <div ref="host" class="echart-host" />
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, onBeforeUnmount, watch, ref, shallowRef } from 'vue'

const props = defineProps({
  option: { type: Object, required: true },
  theme: { type: String, default: 'dark' },
})

const host = ref(null)
const chart = shallowRef(null)

function resize() {
  chart.value?.resize()
}

function init() {
  if (!host.value) return
  if (chart.value) {
    chart.value.dispose()
    chart.value = null
  }
  chart.value = echarts.init(host.value, props.theme, { renderer: 'canvas' })
  chart.value.setOption(props.option, true)
  window.addEventListener('resize', resize)
}

onMounted(init)
onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
  chart.value?.dispose()
  chart.value = null
})

watch(
  () => props.option,
  (opt) => {
    if (chart.value && opt) chart.value.setOption(opt, true)
  },
  { deep: true }
)
</script>

<style scoped>
.echart-host {
  width: 100%;
  height: 100%;
  min-height: 220px;
}
</style>
