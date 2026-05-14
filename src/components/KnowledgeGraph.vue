<template>
  <div ref="wrap" class="graph-wrap">
    <div ref="container" class="graph-canvas" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import G6 from '@antv/g6'

const props = defineProps({
  graphData: { type: Object, required: true },
  height: { type: Number, default: 320 },
})

const wrap = ref(null)
const container = ref(null)
let graph = null

const typeColor = {
  group: '#3b82f6',
  company: '#06b6d4',
  spv: '#a855f7',
  supplier: '#f97316',
  related: '#ef4444',
  bidder: '#eab308',
  person: '#94a3b8',
  contract: '#22c55e',
}

function buildG6Data(raw) {
  const nodes = (raw.nodes || []).map((n) => ({
    id: n.id,
    label: n.label,
    style: { fill: typeColor[n.type] || '#334155', stroke: '#0f172a', lineWidth: 2 },
    labelCfg: { style: { fill: '#e8f1ff', fontSize: 11 } },
  }))
  const edges = (raw.edges || []).map((e, i) => ({
    id: `e${i}`,
    source: e.source,
    target: e.target,
    label: e.label,
    style: { stroke: 'rgba(59,130,246,0.45)' },
    labelCfg: {
      autoRotate: true,
      refY: 0,
      style: { fill: '#8ba3c7', fontSize: 10, background: { fill: '#0c1c34', padding: [2, 4, 2, 4], radius: 2 } },
    },
  }))
  return { nodes, edges }
}

function render() {
  if (!container.value) return
  const w = wrap.value?.offsetWidth || 800
  if (graph) {
    graph.destroy()
    graph = null
  }
  graph = new G6.Graph({
    container: container.value,
    width: w,
    height: props.height,
    modes: { default: ['drag-canvas', 'zoom-canvas', 'drag-node'] },
    layout: {
      type: 'force',
      preventOverlap: true,
      linkDistance: 120,
      nodeStrength: -80,
      edgeStrength: 0.2,
    },
    defaultNode: {
      size: 38,
      type: 'circle',
      style: { stroke: '#0f172a', lineWidth: 2 },
      stateStyles: {
        highlight: { lineWidth: 3, stroke: '#60a5fa', shadowColor: '#3b82f6', shadowBlur: 16 },
      },
    },
    defaultEdge: { type: 'quadratic', style: { lineWidth: 1.5 } },
  })

  const data = buildG6Data(props.graphData)
  graph.data(data)
  graph.render()

  graph.on('node:click', (evt) => {
    const id = evt.item.getID()
    graph.getNodes().forEach((n) => graph.setItemState(n, 'highlight', false))
    graph.setItemState(evt.item, 'highlight', true)
    const neighbors = new Set([id])
    graph.getEdges().forEach((edge) => {
      const m = edge.getModel()
      if (m.source === id || m.target === id) {
        neighbors.add(m.source)
        neighbors.add(m.target)
      }
    })
    graph.getNodes().forEach((n) => {
      if (neighbors.has(n.getID())) graph.setItemState(n, 'highlight', true)
    })
  })
}

function onResize() {
  if (!graph || !wrap.value) return
  graph.changeSize(wrap.value.offsetWidth, props.height)
}

onMounted(() => {
  render()
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
  graph?.destroy()
  graph = null
})

watch(
  () => props.graphData,
  () => render(),
  { deep: true }
)
watch(
  () => props.height,
  () => {
    onResize()
  }
)
</script>

<style scoped>
.graph-wrap {
  width: 100%;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: rgba(0, 0, 0, 0.25);
  overflow: hidden;
}
.graph-canvas {
  width: 100%;
}
</style>
