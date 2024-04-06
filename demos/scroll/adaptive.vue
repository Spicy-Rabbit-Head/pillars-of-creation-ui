<script setup lang="ts"></script>

<template>
  <div style="max-width: 360px; height: 120px; border: #bd34fe 1px solid">
    <poc-scroll height="100%" use-y-bar style="max-width: 360px">
      <p v-for="n in 9" :key="n" style="padding: 5px 10px">
        {{ n }}、在此处滚动鼠标滚轮
      </p>
    </poc-scroll>
  </div>
</template>

<style scoped></style>
