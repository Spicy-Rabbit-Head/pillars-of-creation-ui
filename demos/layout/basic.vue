<template>
  <div style="border: red 1px solid; height: 500px">
    <poc-layout
      logo="https://vitejs.cn/vite3-cn/logo.svg"
      sign-name="Pillars Of Creation Ui"
      :user="user"
      :menus="menus"
      @user-action="handleUserAction"
    >
      <template #main>
        <div style="width: 100%; padding: 0 20px">
          <p v-for="n in 40" :key="n">
            {{ n }}
          </p>
        </div>
      </template>
    </poc-layout>
  </div>
</template>

<script setup lang="ts">
import type { MenuOptions } from 'pillars-of-creation-ui'

const user = {
  name: 'Test User',
  email: 'email@test.com'
}

const menus: MenuOptions[] = [
  {
    label: '1',
    name: '菜单 1',
    icon: 'i-ep-add-location',
    children: [
      {
        label: '1-1',
        name: '子菜单 1'
      },
      {
        label: '1-2',
        name: '子菜单 2'
      },
      {
        label: '1-3',
        name: '子菜单 3'
      }
    ]
  },
  {
    label: '2',
    name: '菜单 2',
    icon: 'i-ep-apple',
    disabled: true
  },
  {
    label: '3',
    name: '菜单 3',
    icon: 'i-ep-bicycle'
  },
  {
    label: '4',
    name: '菜单 4',
    icon: 'i-ep-brush'
  },
  {
    label: '5',
    name: '菜单 5',
    icon: 'i-ep-briefcase'
  }
]

function handleUserAction(label: string) {
  console.info(label)
}
</script>

<style scoped></style>
