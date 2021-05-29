import 'reflect-metadata'
import { join } from 'path'
import getPort from 'get-port'
import { configure } from 'japa'
import sourceMapSupport from 'source-map-support'

process.env.NODE_ENV = 'testing'
process.env.ADONIS_ACE_CWD = join(__dirname)
sourceMapSupport.install({ handleUncaughtExceptions: false })

async function startHttpServer() {
  const { Ignitor } = await import('@adonisjs/core/build/src/Ignitor')
  process.env.PORT = String(await getPort())
  await new Ignitor(__dirname).httpServer().start()
}

// run only one spec file, if sepcified, or all
function getTestFiles() {
  let userDefined = process.argv.slice(2)[0]
  if (!userDefined) {
    return 'tests/**/*.spec.ts'
  }

  const regex = /\.spec$|\.spec\.ts$|\.spec\.js$|\.ts$|\.js$/

  return `tests/${userDefined.replace(regex, '')}.spec.ts`
}

/**
 * Configure test runner
 */
configure({
  files: getTestFiles(),
  before: [startHttpServer],
})
