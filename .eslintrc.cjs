// 定义 ESLint 配置
module.exports = ({
  // 继承的 ESLint 配置
  extends: ['@pillars-of-creation-ui/eslint-config'],
  root: true,
  rules: {
    // 关闭在定义变量之前,禁止使用变量
    '@typescript-eslint/no-use-before-define': 'off',
    // 关闭禁止使用 v-html 来防止 XSS 攻击
    'vue/no-v-html': 'off',
    // 关闭禁止使用特定的语法
    'vue/no-textarea-mustache': 'off'
  },
  overrides: [
    {
      // 匹配 components 文件夹下的所有 .vue 文件
      files: ['components/**/*.vue'],
      rules: {
        // 使用未使用变量的错误级别提示
        '@typescript-eslint/no-unused-vars': 'error',
        // 一致的类型导入设置
        '@typescript-eslint/consistent-type-imports': [
          'error',
          {
            // 优先使用 type-imports 导入类型
            prefer: 'type-imports',
            // 不禁止类型注解
            disallowTypeAnnotations: false
          }
        ],
        // 强制组件标签的顺序
        'vue/component-tags-order': [
          'error',
          {
            // 组件标签的顺序 禁止使用除 <template> 或 <script> 之外的块
            order: [['template', 'script']]
          }
        ],
        // 禁止特定块
        'vue/no-restricted-block': [
          'error',
          {
            // 禁止使用除 <template> 或 <script> 之外的块
            element: '/[^(template|script)]/',
            // 规则提示信息
            message: '不要使用块以外的 <template> 和 <script>.'
          }
        ]
      }
    },
    {
      // 匹配所有 .spec.tsx 文件
      files: ['**/*.spec.tsx'],
      rules: {
        'react/jsx-key': 'off'
      }
    },
    {
      // 匹配 docs/demos 文件夹下的所有文件
      files: ['docs/demos/**'],
      globals: {
        // 定义全局变量 __ROLLBACK_LANG__
        __ROLLBACK_LANG__: 'readonly'
      },
      rules: {
        // 关闭对导入的模块进行排序
        'import/order': 'off'
      }
    },
    {
      files: ['playground/**'],
      globals: {
        __DEMOS__: 'readonly',
        __TARGET__: 'readonly',
        __THEME__: 'readonly',
        __PORT__: 'readonly'
      }
    },
    {
      // 匹配 scripts 文件夹下的所有文件
      files: ['scripts/**'],
      rules: {
        // 禁止逗号运算符
        'no-sequences': 'off',
        // 关闭禁止使用 require
        '@typescript-eslint/no-var-requires': 'off'
      }
    },
    {
      // 匹配所有 .md 文件下的文件
      files: ['**/*.md/*.*'],
      rules: {
        // 关闭对导入的模块进行排序
        'import/order': 'off'
      }
    }
  ],
  globals: {
    // 将全局变量 __VERSION__ 设置为只读
    __VERSION__: 'readonly'
  }
})
