import { randomUUID } from 'crypto'
import pino from 'pino'
import pinoHttp from 'pino-http'

const log = pino({
  level: 'debug',
  redact: ['req.headers.authorization']
})

const httpLogger = pinoHttp({ logger: log, genReqId: () => randomUUID })

export default log
export { httpLogger }
