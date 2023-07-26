import { WApp, MessageMedia } from './web.js'
import { Permissions } from './privileges.js'

/* Handle OutGoing Messages */
WApp.on('message_create', async (message) => {
    if (Permissions.to(message.to)) {
        try {
            if (message.body === '!ping') {
                const [ chat, media ] = await Promise.all([
                    message.getChat(),
                    MessageMedia.fromUrl('https://cdn.myanimelist.net/images/anime/1429/135044.jpg')
                ]) 
                await Promise.all([
                    message.reply('Message Accepted'),
                    chat.sendMessage(media)
                ])
            }
        } catch (e: unknown) {
            await message.reply(message.from, ` Error : ${ (e as Error).message }`)
        }
    }
})

/* Handle Incomming Messages */
WApp.on('message', async (message) => {
    if (message.body.startsWith('!') && !Permissions.from(message.from)) {
        await message.reply(`[${ message.from.split('@')[0] }] Device: [WhatsApp ${ message.deviceType }] is not Authorized to Use Commands`)
    } else if (Permissions.from(message.from)) {
        console.log(message)
    }
})

export default WApp
