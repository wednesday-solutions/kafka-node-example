import { json } from 'body-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { serializeError } from 'serialize-error'
import bootstrapAsyncDependencies from './Shared/BootstrapAsyncDepdencies'

import log, { httpLogger } from './Shared/Logger'

const logger = log.child({ module: startup.name })

export default async function startup() {
  process.on('uncaughtException', (err) =>
    logger.fatal(
      serializeError(err),
      'an "uncaughtException" was thrown and globally handled'
    )
  )
  process.on('unhandledRejection', (err) =>
    logger.fatal(
      serializeError(err),
      'an "unhandledRejection" was thrown and globally handled'
    )
  )
  const app = express()

  logger.debug('bootstrapping app')
  app.use(httpLogger)
  app.set('logger', log)
  app.use(cors({ origin: 'http://localhost:3000' }))
  app.use(json())
  app.use(helmet.hidePoweredBy())
  await bootstrapAsyncDependencies(app)
  return app
}
