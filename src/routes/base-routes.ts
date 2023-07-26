import { Router } from 'express';
import { ExpressResponse } from '../core/utils/response.js';
import { WApp } from '../core/app/web.js';

const app = Router()

app.get('/chats', async (req, res) => {
    const rawData = await WApp.getChats()
    const chats = rawData.map(({ id, name, isGroup }) => {
        return {
            id: id,
            name: name,
            isGroup: isGroup
        }
    })
    return ExpressResponse(res, true, 200, chats)
})

export default app
