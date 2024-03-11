<script setup lang="ts">
import { ref } from 'vue'

const width = ref(0)
const height = ref(0)

function handleResize(entry: ResizeObserverEntry) {
  console.info('切换大小')

  const box = entry.borderBoxSize?.[0]

  if (box) {
    width.value = box.inlineSize
    height.value = box.blockSize
  } else {
    width.value = entry.contentRect.width
    height.value = entry.contentRect.height
  }
}
</script>

<template>
  <poc-resize-observer throttle @resize="handleResize">
    <div class="resizable-pane">
      <span> Width: {{ width }}px {{ width === 400 ? '(Max)' : width === 200 ? '(Min)' : '' }} </span>
      <span> Height: {{ height }}px {{ height === 200 ? '(Max)' : height === 100 ? '(Min)' : '' }} </span>
    </div>
  </poc-resize-observer>
</template>

<style scoped>
.resizable-pane {
  display: inline-flex;
  flex-direction: column;
  width: 300px;
  min-width: 200px;
  max-width: 400px;
  height: 150px;
  min-height: 100px;
  max-height: 200px;
  padding: 10px;
  overflow: auto;
  color: #fff;
  resize: both;
  background-color: olivedrab;
  border: tomato 2px solid;
  border-radius: 4px;
}
</style>
