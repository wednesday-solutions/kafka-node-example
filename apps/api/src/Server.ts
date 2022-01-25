import { serializeError } from 'serialize-error'

import startup from './App'
import log from './Shared/Logger'

const logger = log.child({ module: 'server' })

startup()
  .then((app) => {
    const port = 5000
    try {
      const server = app.listen(port, () => {
        if (!server) logger.fatal('error starting the server')
        logger.info({ port }, 'server listening')
      })
    } catch (err) {
      logger.fatal(serializeError(err), '💣')
    }
  })
  .catch((e) => {
    logger.fatal(serializeError(e), 'bootstrapping the server failed')
  })
