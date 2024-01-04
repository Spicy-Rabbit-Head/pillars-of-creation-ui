import dts from 'vite-plugin-dts'

const outDir = 'dist'
export const ConfigDtsPlugin = () => {
  return dts({
    include: ['common/config/src', 'components', 'index.ts', 'full-lib.ts', 'types.d.ts'],
    exclude: ['node_modules', 'components/*/tests'],
    outDir,
    compilerOptions: {
      sourceMap: false,
      paths: {
        '@/*': ['./*'],
        '@pillars-of-creation-ui/config': ['common/config/src'],
        'pillars-of-creation-ui': ['.'],
        csstype: ['node_modules/csstype']
      }
    },
    copyDtsFiles: true,
    pathsToAliases: false,
    aliasesExclude: [/^@pillars-of-creation-ui\/(utils|hooks|config)/]
  })
}
