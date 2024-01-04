import { logger, run } from '@pillars-of-creation-ui/scripts'
import minimist from 'minimist'

const args = minimist<{
  d?: boolean,
  dev?: boolean
}>(process.argv.slice(2))

const devOnly = args.dev || args.d

const env = devOnly ? 'development' : 'production'

async function main() {
  logger.withBothLn(() => logger.info('开始构建库...'))

  logger.info('开始构建库引导文件')
  await run('pnpm', ['bootstrap'])
  logger.success('库引导文件构建完成')

  logger.ln()

  logger.info('开始构建库属性文件')
  await run('pnpm', ['props'])
  logger.success('库属性文件构建完成')

  logger.ln()

  logger.info('开始构建库入口文件')
  await run('vite', ['build', '--config', 'vite.config.ts'], {
    env: {
      NODE_ENV: env
    }
  })
  logger.success('库入口文件构建完成')

  logger.ln()

  logger.info('开始构建库完整入口文件')
  await run('vite', ['build', '--config', 'vite.full.config.ts'], {
    stdio: 'inherit',
    env: {
      NODE_ENV: env
    }
  })
  logger.success('库完整入口文件构建完成')

  logger.ln()

  if (!process.exitCode) {
    logger.withEndLn(() => logger.success('所有构建成功完成'))
  }
}

main().catch(error => {
  logger.error(error)
  process.exit(1)
})
