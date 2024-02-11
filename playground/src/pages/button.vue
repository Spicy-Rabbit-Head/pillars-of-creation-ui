<script setup lang="ts">
import LayoutContent from '../layout-content.vue'
import Layout from '../layout.vue'
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
        <z-button>Default</z-button>
        <z-button type="primary">
          Primary
        </z-button>
        <z-button type="info">
          Info
        </z-button>
        <z-button type="success">
          Success
        </z-button>
        <z-button type="warning">
          Warning
        </z-button>
        <z-button type="error">
          Error
        </z-button>
        <z-button color="orange">
          自定义
        </z-button>
      </div>
    </layout-content>
    <layout-content content="禁用状态">
      <div
        grid
        grid-cols-4
        gap-2
        justify-items-center
      >
        <z-button>Default</z-button>
        <z-button disabled>
          Default
        </z-button>
        <z-button type="primary">
          Primary
        </z-button>
        <z-button type="primary" disabled>
          Primary
        </z-button>
      </div>
    </layout-content>
    <layout-content content="简约风格">
      <div
        grid
        grid-cols-4
        gap-2
        justify-items-center
      >
        <z-button simple type="primary">
          Primary
        </z-button>
        <z-button simple type="info">
          Info
        </z-button>
        <z-button simple type="success">
          Success
        </z-button>
        <z-button simple type="warning">
          Warning
        </z-button>
        <z-button simple type="error">
          Error
        </z-button>
        <z-button simple color="teal">
          自定义
        </z-button>
      </div>
    </layout-content>
    <layout-content content="文字按钮">
      <div
        grid
        grid-cols-4
        gap-2
        justify-items-center
      >
        <z-button text type="primary">
          Primary
        </z-button>
        <z-button text type="info">
          Info
        </z-button>
        <z-button text type="success">
          Success
        </z-button>
        <z-button text type="warning">
          Warning
        </z-button>
        <z-button text type="error">
          Error
        </z-button>
        <z-button text color="teal">
          自定义
        </z-button>
      </div>
    </layout-content>
    <layout-content content="虚线按钮">
      <div
        grid
        grid-cols-4
        gap-2
        justify-items-center
      >
        <z-button dashed type="primary">
          Primary
        </z-button>
        <z-button dashed type="info">
          Info
        </z-button>
        <z-button dashed type="success">
          Success
        </z-button>
        <z-button dashed type="warning">
          Warning
        </z-button>
        <z-button dashed type="error">
          Error
        </z-button>
        <z-button dashed color="teal">
          自定义
        </z-button>
      </div>
    </layout-content>
    <layout-content content="内置徽标">
      <div
        grid
        grid-cols-4
        gap-2
        justify-items-center
      >
        <z-button badge="2" type="primary">
          Primary
        </z-button>
      </div>
    </layout-content>
  </layout>
</template>

<style scoped></style>
