<script setup lang="ts">
import LayoutContent from '@/playground/src/layout-content.vue'

import Layout from '../layout.vue'
</script>

<template>
  <layout name="badge">
    <layout-content content="基本用法">
      <div
        grid
        gap-2
        grid-cols-4
        justify-items-center
      >
        <z-badge :content="34"></z-badge>
        <z-badge :content="34" type="primary"></z-badge>
        <z-badge :content="34" type="success"></z-badge>
        <z-badge :content="34" type="warning"></z-badge>
        <z-badge :content="34" type="info"></z-badge>
        <z-badge :content="34" type="disabled"></z-badge>
      </div>
    </layout-content>
    <layout-content content="最大值">
      <z-badge :content="34" :max="10"></z-badge>
    </layout-content>
    <layout-content content="状态点">
      <div
        grid
        gap-2
        grid-cols-4
        justify-items-center
      >
        <z-badge :content="34" is-dot></z-badge>
        <z-badge :content="34" type="primary" is-dot></z-badge>
        <z-badge :content="34" type="success" is-dot></z-badge>
        <z-badge :content="34" type="warning" is-dot></z-badge>
        <z-badge :content="34" type="info" is-dot></z-badge>
        <z-badge :content="34" type="disabled" is-dot></z-badge>
      </div>
    </layout-content>
    <layout-content content="自定义颜色">
      <z-badge :content="34" color=" #dc39b0"></z-badge>
    </layout-content>
  </layout>
</template>

<style scoped></style>
