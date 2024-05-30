<script setup lang="ts">
import { reactive } from 'vue'

const loginForm = reactive({
  // username: '',
  // password: ''
})
</script>

<template>
  <poc-form
    ref="form"
    style="max-width: 300px"
    :model="loginForm"
    hide-label
    action="/components/form"
    target="_blank"
  >
    <poc-form-item label="username" prop="username">
      <poc-input placeholder="请输入帐号">
        <template #prefix>
          <poc-icon icon="i-ri-account-circle-line">
          </poc-icon>
        </template>
      </poc-input>
    </poc-form-item>
    <poc-form-item label="password" prop="password">
      <poc-input type="password" placeholder="请输入密码">
        <template #prefix>
          <poc-icon icon="i-ri-lock-line">
          </poc-icon>
        </template>
      </poc-input>
    </poc-form-item>
    <poc-form-item action style="margin-bottom: 5px; text-align: center">
      <poc-form-submit type="success" icon="i-ri-check-line">
        登 陆
      </poc-form-submit>
      <poc-form-reset type="warning">
        重 置
      </poc-form-reset>
    </poc-form-item>
  </poc-form>
</template>
