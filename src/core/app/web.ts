import qrcode from 'qrcode-terminal'
import WhatsappWeb from 'whatsapp-web.js'
const { Client, RemoteAuth } = WhatsappWeb
const { MessageMedia: export_message_media } = WhatsappWeb

import mongoose from 'mongoose'
import { MongoStore } from 'wwebjs-mongo'
import { AppEvents } from '../events/emitter.js'
import { ENV } from '../../config/config.js'

/* connect to database */
AppEvents.on('onStart', async () => {
    await mongoose.connect(ENV.MONGODB_URI)
})

export const WApp = new Client({
    authStrategy: new RemoteAuth({
        store: new MongoStore({ mongoose: mongoose }),
        backupSyncIntervalMs: 300000
    }),
    puppeteer: {
        args: ['--no-sandbox']
    }
})

mongoose.connection.on('connected', async () => {
    console.log('DB Connected')
    /* initialize whatsapp when db is ready */
    await WApp.initialize()
})

WApp.on('qr', (qr: string) => {
    qrcode.generate(qr, { small: true })
})

WApp.on('authenticated', () => {
    console.log('Authentication Success')
})

WApp.on('remote_session_saved', () => {
    console.log('Remote Session Saved')
})

WApp.on('ready', () => {
    /* when whatsapp is ready start the webserver */
    AppEvents.emit('Ready')
    console.log('WhatsApp Client is Ready!')
})

export const MessageMedia = export_message_media
