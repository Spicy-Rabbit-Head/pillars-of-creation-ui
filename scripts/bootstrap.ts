import { existsSync, statSync } from 'node:fs'

import { readFile, readdir, writeFile } from 'node:fs/promises'
import { cpus } from 'node:os'

import { resolve } from 'node:path'

import { runParallel, toCapitalCase } from '@pillars-of-creation-ui/utils'
import { ESLint } from 'eslint'
import { logger } from '@pillars-of-creation-ui/scripts'

import { format } from 'prettier'
import { components as allComponents, componentsDir, prettierConfig, rootDir } from './constant'

async function main() {
  const plugins = ['confirm', 'contextmenu', 'loading', 'message', 'notice', 'toast']
  const ignores = ['typography']
  const exportComponents = allComponents.filter(c => !ignores.includes(c))
  const components = exportComponents.filter(c => !plugins.includes(c))
  const directives = await readDirectives()

  const index = `
    ${exportComponents.map(component => `import { ${toCapitalCase(component)} } from './${component}'`).join('\n')}

    import { buildInstall } from './create'
    import { installDirectives } from '@/directives'

    export { version } from './version'
    export * from './create'

    export type { PropsOptions } from './props'

    const components = [
      ${components.map(toCapitalCase).join(',\n')},
      // directives
      installDirectives
    ]

    export const install = buildInstall(components)

    ${allComponents.map(component => `export * from './${component}'`).join('\n')}

    export * from '@/directives'
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
      ],
      directives: {
        ${directives
          .map(directive => `"v${toCapitalCase(directive.name)}": ${JSON.stringify(directive.components)}`)
          .join(',\n')}
      }
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

  await runParallel(cpus().length, allComponents, async component => {
    const stylPath = resolve(rootDir, `style/${component}.styl`)

    if (!existsSync(stylPath)) {
      await writeFile(stylPath, '', 'utf-8')
    }
  })

  const inherit = `
.{namespace}-inherit
  font-family: inherit;
  font-size: inherit;
  font-variant-numeric: inherit;
  line-height: inherit

.{namespace}-inherit-color
  color: inherit
  `
  const componentsStyle =
    (await topologicalStyle()).map(component => `@require './${component}.styl';`).join('\n') + '\n' + inherit
  const styleIndex = "@require './preset.styl';\n\n" + componentsStyle
  await writeFile(resolve(rootDir, 'style/components.styl'), componentsStyle, 'utf-8')
  await writeFile(resolve(rootDir, 'style/index.styl'), styleIndex, 'utf-8')
}

async function readDirectives() {
  const componentRE = /import \{ (.+) } from '@\/components\/.+'/
  const directivesDir = resolve(rootDir, 'directives')
  return await Promise.all(
    (await readdir(directivesDir))
      .filter(f => statSync(resolve(directivesDir, f)).isDirectory())
      .map(async directive => {
        const content = await readFile(resolve(directivesDir, directive, 'index.ts'), 'utf-8')
        const lines = content.split('\n')
        const components: string[] = []

        for (const line of lines) {
          if (!line.startsWith('import')) break
          if (!line) continue

          const matched = line.match(componentRE)

          if (matched?.[1]) {
            components.push(...matched[1].split(',').map(s => s.trim()))
          }
        }

        return {
          name: directive,
          components
        }
      })
  )
}

async function topologicalStyle() {
  const importRE = /import '@\/components\/(.+)\/style'/
  const depsMap = new Map<string, string[]>()

  await runParallel(cpus().length, allComponents, async component => {
    const deps: string[] = []
    const path = resolve(componentsDir, component, 'style.ts')

    depsMap.set(component, deps)

    if (!existsSync(path)) {
      return
    }

    let match: RegExpMatchArray | null

    for (const line of (await readFile(path, 'utf-8')).split('\n')) {
      if ((match = line.match(importRE)) && match[1] !== 'preset') {
        deps.push(match[1])
      }
    }
  })

  const list: string[] = []
  const walkedSet = new Set<string>()

  const push = (deps: string[]) => {
    for (const dep of deps) {
      if (walkedSet.has(dep)) {
        continue
      }

      walkedSet.add(dep)

      if (depsMap.has(dep)) {
        push(depsMap.get(dep)!)
      }

      list.push(dep)
    }
  }

  for (const [component, deps] of depsMap) {
    push(deps)

    if (!walkedSet.has(component)) {
      walkedSet.add(component)
      list.push(component)
    }
  }

  return list
}

main().catch(error => {
  logger.error(error)
  process.exit(1)
})
