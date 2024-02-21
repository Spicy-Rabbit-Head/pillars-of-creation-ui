<script setup lang="ts">
import { ref } from 'vue'

import LayoutContent from '../layout-content.vue'
import Layout from '../layout.vue'

const loading = ref(false)

function toggleLoading() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>

<template>
  <layout name="button">
    <layout-content content="基本类型">
      <div
        grid
        grid-cols-4
        gap-2
        justify-items-center
      >
        <poc-button>Default</poc-button>
        <poc-button type="primary">
          Primary
        </poc-button>
        <poc-button type="info">
          Info
        </poc-button>
        <poc-button type="success">
          Success
        </poc-button>
        <poc-button type="warning">
          Warning
        </poc-button>
        <poc-button type="error">
          Error
        </poc-button>
        <poc-button color="orange">
          自定义
        </poc-button>
      </div>
    </layout-content>
    <layout-content content="禁用状态">
      <div
        grid
        grid-cols-4
        gap-2
        justify-items-center
      >
        <poc-button>Default</poc-button>
        <poc-button disabled>
          Default
        </poc-button>
        <poc-button type="primary">
          Primary
        </poc-button>
        <poc-button type="primary" disabled>
          Primary
        </poc-button>
      </div>
    </layout-content>
    <layout-content content="简约风格">
      <div
        grid
        grid-cols-4
        gap-2
        justify-items-center
      >
        <poc-button simple type="primary">
          Primary
        </poc-button>
        <poc-button simple type="info">
          Info
        </poc-button>
        <poc-button simple type="success">
          Success
        </poc-button>
        <poc-button simple type="warning">
          Warning
        </poc-button>
        <poc-button simple type="error">
          Error
        </poc-button>
        <poc-button simple color="teal">
          自定义
        </poc-button>
      </div>
    </layout-content>
    <layout-content content="文字按钮">
      <div
        grid
        grid-cols-4
        gap-2
        justify-items-center
      >
        <poc-button text type="primary">
          Primary
        </poc-button>
        <poc-button text type="info">
          Info
        </poc-button>
        <poc-button text type="success">
          Success
        </poc-button>
        <poc-button text type="warning">
          Warning
        </poc-button>
        <poc-button text type="error">
          Error
        </poc-button>
        <poc-button text color="teal">
          自定义
        </poc-button>
      </div>
    </layout-content>
    <layout-content content="虚线按钮">
      <div
        grid
        grid-cols-4
        gap-2
        justify-items-center
      >
        <poc-button dashed type="primary">
          Primary
        </poc-button>
        <poc-button dashed type="info">
          Info
        </poc-button>
        <poc-button dashed type="success">
          Success
        </poc-button>
        <poc-button dashed type="warning">
          Warning
        </poc-button>
        <poc-button dashed type="error">
          Error
        </poc-button>
        <poc-button dashed color="teal">
          自定义
        </poc-button>
      </div>
    </layout-content>
    <layout-content content="图标按钮">
      <div
        grid
        grid-cols-4
        gap-2
        justify-items-center
      >
        <poc-button icon="i-ep-place" type="primary">
          Primary
        </poc-button>
        <poc-button icon="i-ep-grape" type="primary"></poc-button>
        <poc-button icon="i-ep-home-filled" circle type="error">
          Error
        </poc-button>
        <poc-button circle icon="i-ep-drizzling" type="primary"></poc-button>
      </div>
    </layout-content>
    <layout-content content="加载状态">
      <div
        grid
        grid-cols-4
        gap-2
        justify-items-center
      >
        <poc-button loading icon="i-ep-grape" type="primary">
          Primary
        </poc-button>
        <poc-button
          loading
          loading-icon="i-svg-spinners-wind-toy"
          icon="i-ep-grape"
          type="error"
        >
          Error
        </poc-button>
        <poc-button :loading="loading" type="warning" @click.stop="toggleLoading">
          <template #icon>
            <div class="i-ep-refresh"></div>
          </template>
          Warning
        </poc-button>
        <poc-button
          :loading="loading"
          circle
          icon="i-ep-refresh"
          type="success"
          @click.stop="toggleLoading"
        >
        </poc-button>
        <poc-button :loading="loading" type="success" @click.stop="toggleLoading">
          2秒后恢复
        </poc-button>
      </div>
    </layout-content>
    <layout-content content="按钮组">
      <div class="grid gap-2">
        <poc-button-group>
          <poc-button> Default</poc-button>
          <poc-button type="info">
            Info
          </poc-button>
          <poc-button type="success">
            Success
          </poc-button>
        </poc-button-group>
        <poc-button-group size="large" circle>
          <poc-button type="primary">
            Primary
          </poc-button>
          <poc-button type="info">
            Info
          </poc-button>
          <poc-button type="success">
            Success
          </poc-button>
        </poc-button-group>
        <poc-button-group size="small">
          <poc-button icon="i-ep-d-arrow-left">
          </poc-button>
          <poc-button icon="i-ep-d-arrow-right">
          </poc-button>
        </poc-button-group>
      </div>
    </layout-content>
  </layout>
</template>

<style scoped></style>
