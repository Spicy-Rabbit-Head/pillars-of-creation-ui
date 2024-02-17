import { writeFile } from 'node:fs/promises'

import { resolve } from 'node:path'

import { logger } from '@pillars-of-creation-ui/scripts'
import { toCapitalCase } from '@pillars-of-creation-ui/utils'
import { ESLint } from 'eslint'

import { format } from 'prettier'
import { components as allComponents, prettierConfig, rootDir } from './constant'

async function main() {
  const plugins = ['confirm', 'contextmenu', 'loading', 'message', 'notice', 'toast']
  const ignores = ['typography']
  const exportComponents = allComponents.filter(c => !ignores.includes(c))
  const components = exportComponents.filter(c => !plugins.includes(c))

  const index = `
    ${exportComponents.map(component => `import { ${toCapitalCase(component)} } from './${component}'`).join('\n')}

    import { buildInstall } from './create'

    export { version } from './version'
    export * from './create'

    export type { PropsOptions } from './props'

    const components = [
      ${components.map(toCapitalCase).join(',\n')}
    ]

    export const install = buildInstall(components)

    ${allComponents.map(component => `export * from './${component}'`).join('\n')}
  `

  const types = `
    declare module 'vue' {
      export interface GlobalComponents {
        ${[...components]
          .map(name => `Poc${toCapitalCase(name)}: typeof import('pillars-of-creation-ui')['${toCapitalCase(name)}']`)
          .join(',\n')}
      }
    }

    export {}
  `

  /*
  interface ComponentCustomProperties {
        ${plugins
          .map(
            name => `$${name}: typeof import('pillars-of-creation-ui')['${toCapitalCase(name)}']`
          )
          .join(',\n')}
      }
   */

  const metaData = `
    {
      components: [
        ${exportComponents.map(name => `"Poc${toCapitalCase(name)}"`).join(',\n')}
      ]
    }
  `

  const eslint = new ESLint({ fix: true })
  const indexPath = resolve(rootDir, 'components/index.ts')
  const typesPath = resolve(rootDir, 'types.d.ts')
  const metaDataPath = resolve(rootDir, 'meta-data.json')

  await Promise.all([
    writeFile(
      indexPath,
      await format(index, {
        ...prettierConfig,
        parser: 'typescript'
      }),
      'utf-8'
    ),
    writeFile(
      typesPath,
      await format(types, {
        ...prettierConfig,
        parser: 'typescript'
      }),
      'utf-8'
    ),
    writeFile(
      metaDataPath,
      await format(metaData, {
        ...prettierConfig,
        parser: 'json'
      }),
      'utf-8'
    )
  ])

  await ESLint.outputFixes(await eslint.lintFiles([indexPath, typesPath, metaDataPath]))
}

main().catch(error => {
  logger.error(error)
  process.exit(1)
})
