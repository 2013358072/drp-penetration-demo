<template>
  <div class="layout-root">
    <header class="topbar">
      <div class="topbar-left">
        <div class="logo">DRP</div>
        <div class="brand-text">
          <span class="brand-title">穿透式监管</span>
          <span class="brand-sub">· 演示原型</span>
        </div>
      </div>
      <div class="topbar-center">
        <span class="page-title">{{ pageTitle }}</span>
      </div>
      <div class="topbar-right">
        <span class="clock">{{ clock }}</span>
      </div>
    </header>
    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const clock = ref('')

const pageTitle = computed(() => route.meta?.title || '全景监管驾驶舱')

function tick() {
  const d = new Date()
  clock.value = d.toLocaleString('zh-CN', { hour12: false })
}

let timer
onMounted(() => {
  tick()
  timer = setInterval(tick, 1000)
})
onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped>
.layout-root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: radial-gradient(ellipse 120% 80% at 50% -20%, rgba(59, 130, 246, 0.18), transparent 50%),
    var(--bg-deep);
}

.topbar {
  height: 56px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background: var(--bg-panel);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(8px);
  z-index: 100;
}

.topbar-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--accent), #06b6d4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 11px;
  color: #fff;
  box-shadow: var(--glow);
  flex-shrink: 0;
}

.brand-text {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.brand-title {
  font-weight: 700;
  font-size: 15px;
  color: var(--text);
}

.brand-sub {
  font-size: 12px;
  color: var(--text-muted);
}

.topbar-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.page-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--text);
  letter-spacing: 0.02em;
  white-space: nowrap;
}

.topbar-right {
  display: flex;
  align-items: center;
}

.clock {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text-muted);
}

.content {
  flex: 1;
  min-height: 0;
  width: 100%;
  padding: 0;
}
</style>
