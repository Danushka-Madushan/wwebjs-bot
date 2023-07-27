import { Router } from 'express';

const app = Router()

import Webhooks from './webhooks.js'
import Messages from './messages.js'

app.use('/webhooks', Webhooks)

app.use('/messages', Messages)

export default app
