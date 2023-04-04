const qrcode = require('qrcode-terminal');
const axios = require('axios')
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');

const regex = new RegExp(`https://w{3}\\.henteibruh\\.com/20[0-9]{2}/[0-9]{2}/.+\\.html`, '')
const urlRegex = new RegExp(`<p>Source.+?href="(https://w{3}.google.com/search\\?.+?)".target="_blank">|<p>Source:(.+?)</p>`, 'g')
const gregx = new RegExp(`^https://www.google.com/`, '')

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox']
    }
})

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

/*
client.on('message_create', (message) => {
    console.log(message)
});
*/

client.on('message', async (message) => {
    const match = regex.exec(message.body)
    if (match !== null) {
        const chat = await message.getChat();
        try {
            const content = await axios.get(match[0])
            const matches = urlRegex.exec(content.data)

            const media = await MessageMedia.fromUrl('https://cdn.myanimelist.net/images/anime/1429/135044.jpg');
            await chat.sendMessage(media);
            matches.forEach((match, groupIndex) => {
                if (gregx.exec(match) !== null) {
                    client.sendMessage(message.from, ` Souce : ${match}`);
                } else {
                    client.sendMessage(message.from, ` Manual Extract : ${message.body}`);
                }
            });
        } catch(e) {
            client.sendMessage(message.from, ` Error : ${e.message}`);
        }
    }
});


client.initialize();
