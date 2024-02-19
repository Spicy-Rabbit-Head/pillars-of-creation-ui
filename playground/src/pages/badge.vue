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
        <poc-badge :content="34"></poc-badge>
        <poc-badge :content="34" type="primary"></poc-badge>
        <poc-badge :content="34" type="success"></poc-badge>
        <poc-badge :content="34" type="warning"></poc-badge>
        <poc-badge :content="34" type="info"></poc-badge>
        <poc-badge :content="34" type="disabled"></poc-badge>
      </div>
    </layout-content>
    <layout-content content="最大值">
      <poc-badge :content="34" :max="10"></poc-badge>
    </layout-content>
    <layout-content content="状态点">
      <div
        grid
        gap-2
        grid-cols-4
        justify-items-center
      >
        <poc-badge :content="34" is-dot></poc-badge>
        <poc-badge :content="34" type="primary" is-dot></poc-badge>
        <poc-badge :content="34" type="success" is-dot></poc-badge>
        <poc-badge :content="34" type="warning" is-dot></poc-badge>
        <poc-badge :content="34" type="info" is-dot></poc-badge>
        <poc-badge :content="34" type="disabled" is-dot></poc-badge>
      </div>
    </layout-content>
    <layout-content content="自定义颜色">
      <poc-badge :content="34" color=" #dc39b0"></poc-badge>
    </layout-content>
  </layout>
</template>

<style scoped></style>
