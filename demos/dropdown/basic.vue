<script setup lang="ts"></script>

<template>
  <poc-dropdown trigger="click">
    <poc-button type="primary">
      下拉菜单
    </poc-button>
    <template #drop>
      <poc-dropdown-list>
        <poc-dropdown-item name="选项一">
          选项一
        </poc-dropdown-item>
        <poc-dropdown-item name="选项二" divided>
          选项二
        </poc-dropdown-item>
        <poc-dropdown-item name="选项三">
          选项三
        </poc-dropdown-item>
      </poc-dropdown-list>
    </template>
  </poc-dropdown>
</template>

<style scoped></style>
