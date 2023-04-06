const { MessageMedia } = require("whatsapp-web.js")
const client = require("./core/web")
const { ReHentaiBruh, ReGoogleSearch } = require("./core/regex")
const axios = require('axios')
const hasPermissions = require("./core/privileges")

/* Handle OutGoing Messages */
client.on('message_create', async (message) => {
    if (hasPermissions.to(message.to)) {
        const match = ReHentaiBruh.exec(message.body)

        if(message.body === '!ping') {
            message.reply('Message Accepted')
        } else if (match !== null) {
            const chat = await message.getChat()
            try {
                const content = await axios.get(match[0])
                const matches = ReGoogleSearch.exec(content.data)

                const media = await MessageMedia.fromUrl('https://cdn.myanimelist.net/images/anime/1429/135044.jpg')
                await chat.sendMessage(media)
                if (matches !== null) {
                    const links = matches.groups
                    if (links.slink) {
                        client.sendMessage(message.from, ` Souce : ${links.slink}`)
                    } else if (links.sname) {
                        client.sendMessage(message.from, ` Souce : ${links.sname}`)
                    } else {
                        message.reply(message.from, ' Manual Extract! ')
                    }
                }
            } catch (e) {
                message.reply(message.from, ` Error : ${e.message}`)
            }
        }
    }
})

/* Handle Incomming Messages */
client.on('message', async (message) => {
    if (message.body.startsWith('!') && !hasPermissions.from(message.from)) {
        message.reply(`[${message.from.split('@')[0]}] Device: [WhatsApp ${message.deviceType}] is not Authorized to Use Commands`)
    } else if (hasPermissions.from(message.from)) {
        console.log(message)
    }
})

client.initialize()
