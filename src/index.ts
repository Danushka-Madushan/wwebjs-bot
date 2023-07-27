import App from './core/app/controller.js'
import express, { Application } from 'express'
import { AddressInfo } from 'net'
import helmet from 'helmet'
import cors from 'cors'

const app: Application = express()

import Routes from './routes/base-routes.js'
import { ExpressResponse } from './core/utils/response.js'
import { AppEvents } from './core/events/emitter.js'
import { ENV, PORT } from './config/config.js'
import { ExpressRequest } from './routes/middlewares/express-validate.js'
import { DevelopmentLog } from './core/utils/dev.js'

app.use(express.json())
app.use(cors())
app.use(helmet())

app.use(({ originalUrl }, res, next) => {
    DevelopmentLog(originalUrl)
    next()
})

app.use(ExpressRequest)

app.use('/api', Routes)

app.get('/api', async (req, res) => {
    return ExpressResponse(res, true, 200, {
        status: await App.getState(),
        version: ENV.NPM_PACKAGE_VERSION
    })
})

app.use('*', (req, res) => {
    res.sendStatus(403)
})

/* Emit start signal to app controller */
AppEvents.emit('onStart')

/* Start web server when app is ready */
AppEvents.on('Ready', () => {
    const server = app.listen(ENV.PORT || PORT, () => {
        const { address, port } = server.address() as AddressInfo
        console.log(`(WhatsApp) API running in http://${ address }:${ port }`)
    })
})
