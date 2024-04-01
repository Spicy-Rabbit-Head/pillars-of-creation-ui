<script setup lang="ts"></script>

<template>
  <div style="max-width: 360px; border: #bd34fe 1px solid">
    <poc-native-scroll
      :height="120"
      use-y-bar
      use-bar-track
      :bar-fade="0"
    >
      <p v-for="n in 9" :key="n" style="padding: 5px 10px">
        {{ n }}、在此处滚动鼠标滚轮
      </p>
    </poc-native-scroll>
  </div>
</template>

<style scoped></style>
