<script setup lang="ts"></script>

<template>
  <poc-badge :content="11">
    <poc-button>按钮</poc-button>
  </poc-badge>
  <br />
  <br />
  <poc-badge is-dot>
    <poc-button>按钮</poc-button>
  </poc-badge>
  <br />
  <br />
  <poc-space>
    <poc-badge :content="34"></poc-badge>
    <poc-badge :content="34" type="primary"></poc-badge>
    <poc-badge :content="34" type="success"></poc-badge>
    <poc-badge :content="34" type="warning"></poc-badge>
    <poc-badge :content="34" type="info"></poc-badge>
    <poc-badge :content="34" type="disabled"></poc-badge>
  </poc-space>
</template>

<style scoped></style>
