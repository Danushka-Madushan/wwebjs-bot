import App from './core/app/controller.js'
import express, { Application } from 'express'
import { AddressInfo } from 'net'

const app: Application = express()

import Routes from './routes/base-routes.js'
import { ExpressResponse } from './core/utils/response.js'
import { AppEvents } from './core/events/emitter.js'
import { ENV, PORT } from './config/config.js'

app.use('/api', Routes)

app.get('/api', async (req, res) => {
    return ExpressResponse(res, true, 200, {
        status: await App.getState(),
        version: ENV.NPM_PACKAGE_VERSION
    })
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
