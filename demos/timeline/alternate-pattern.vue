<script setup lang="ts">
import { ref } from 'vue'

const flip = ref(false)
</script>

<template>
  <p>
    翻转：
    <poc-switch v-model:value="flip"></poc-switch>
  </p>
  <poc-timeline alternate :flip="flip" style="max-width: 500px">
    <poc-timeline-item>
      <span style="margin-bottom: 10px">项目负责人</span>
      <poc-card> 今日客户提出了XXX的需求，请及时做技术可行性分析</poc-card>
    </poc-timeline-item>
    <poc-timeline-item>
      <span style="margin-bottom: 10px">技术负责人</span>
      <poc-card> 经过会议讨论，XXX需求可以实现，请实施人员跟进</poc-card>
    </poc-timeline-item>
    <poc-timeline-item>
      <span style="margin-bottom: 10px">技术骨干</span>
      <poc-card> 已收到开发需求，目前开发进度为30%</poc-card>
    </poc-timeline-item>
    <poc-timeline-item>
      <span style="margin-bottom: 10px">项目负责人</span>
      <poc-card> 请及时跟进XXX需求开发，目前客户对这块的进度提出了疑问</poc-card>
    </poc-timeline-item>
    <poc-timeline-item>
      <span style="margin-bottom: 10px">技术负责人</span>
      <poc-card> 收到，已及时跟进开发情况，增加开发人员投入</poc-card>
    </poc-timeline-item>
  </poc-timeline>
</template>

<style scoped></style>
