<script setup lang="ts"></script>

<template>
  <poc-menu style="max-width: 240px">
    <poc-menu-item label="1" icon="i-ep-camera">
      菜单一
      <template #group>
        <poc-menu-item label="1-1">
          子菜单一
        </poc-menu-item>
        <poc-menu-item label="1-2">
          子菜单二
        </poc-menu-item>
      </template>
    </poc-menu-item>
    <poc-menu-item label="2" icon="i-ep-dish">
      菜单二
    </poc-menu-item>
    <poc-menu-item label="3" icon="i-ep-basketball" disabled>
      菜单三
    </poc-menu-item>
    <poc-menu-item label="4" icon="i-ep-avatar">
      菜单四
    </poc-menu-item>
  </poc-menu>
</template>

<style scoped></style>
