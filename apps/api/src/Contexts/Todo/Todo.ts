import { MongoClient } from 'mongodb'
import { Application } from 'express'
import { CONTEXT_NAME } from '../../Shared/Constants'
import log from '../../Shared/Logger'
const logger = log.child({ module: 'BootstrapAsyncDepdencies' })

export async function bootstrapAsyncDependencies(app: Application) {
  logger.debug('connecting to MONGODB')
  const client = await MongoClient.connect('mongodb://localhost:27017/todos')
  logger.debug('connected to MONGODB')
  app.set(`${CONTEXT_NAME}-mongoclient`, client)
}
