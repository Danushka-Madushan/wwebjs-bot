import { Request, Router } from 'express';
import { WApp } from '../core/app/web.js';
import { TPayload } from 'webhooks';
import { WebhookNamespace, newWebhookLink } from '../core/services/db-controller.js';
import { ExpressResponse } from '../core/utils/response.js';

const app = Router()

/*
  Webhook listner, every webhook we create will be pointed to this route
*/
app.post('/listen/:hookId', async (req: Request<{ hookId: string }, object, TPayload>, res) => {
    /* resolve request */
    res.sendStatus(200)

    const { headers: { "x-github-event": githubEvent } } = req
    const { body: { head_commit, ref, pusher } } = req
    const { params: { hookId } } = req

    await WApp.sendMessage(WebhookNamespace[hookId], JSON.stringify({
        event: githubEvent,
        webhookid: hookId,
        payload: {
            branch: ref,
            pusher: pusher
        },
        commit: head_commit
    }))
})

/* GET Webhook Namespace (in memory) */
app.get('/', (req, res) => {
    return ExpressResponse(res, true, 200, WebhookNamespace)
})

/* Register new webhook
{
    "hookid": "some_endpoint",
    "handler": "a valid whatsapp chatid"
}
*/
app.post('/register', async (req: Request<object, object, { hookid: string, handler: string }>, res) => {
    const { body: { hookid, handler } } = req
    try {
        await newWebhookLink(hookid, handler)
        return ExpressResponse(res, true, 200, 'Success')
    } catch (error: unknown) {
        if ((error as { code: number }).code === 11000) {
            return ExpressResponse(res, false, 400, {
                message: 'Hook id not avalilable'
            })
        }
        return ExpressResponse(res, false, 400, 'ERROR')
    }
})

export default app
