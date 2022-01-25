import { Application } from 'express'

import { bootstrapAsyncDependencies as bootstrapAsyncToDoDependencies } from '../Contexts/Todo/Todo'

export default async function bootstrapAsyncDependencies(app: Application) {
  await bootstrapAsyncToDoDependencies(app)
}
