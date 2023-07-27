import { DBNamespace } from 'webhooks'
import { NameSapce } from './namespace.schema.js'

interface TNamespace {
    [hookid: string] : string
}

/* Webhook Namespace
 * Every webhook has a unique hookid at the end of the api endpoint
 * every hookid is binded to a whatsapp chat id. it is fast to retrieve chatid from
 * memory instead of pulling from the db. it saves approximately 140ms of time
*/
export const WebhookNamespace: TNamespace = {}

export const RefreshNamespace = async () => {
    const result = await NameSapce.aggregate<DBNamespace & { _id: string }>([
        {
            '$project': {
                '__v': 0
            }
        }
    ])
    if (result.length !== 0) {
        for (const { hookid, handler } of result) {
            WebhookNamespace[hookid] = handler
        }
    }
}

export const newWebhookLink = async (id: string, chatid: string) => {
    const { hookid, handler } = await NameSapce.create({
        hookid: id,
        handler: chatid
    })
    WebhookNamespace[hookid] = handler
}
