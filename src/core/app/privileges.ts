import { ReNumber } from './regex.js'

const accesslist = {
    from: [
        '94764958088',
    ],
    to: [
        '94764958088',
    ],
    author: [
        '94764958088',
    ]
}

export const Permissions = {
    author: (number: string) => {
        return accesslist.author.includes(ReNumber(number))
    },
    from: (number: string) => {
        return accesslist.from.includes(ReNumber(number))
    },
    to: (number: string) => {
        return accesslist.to.includes(ReNumber(number))
    }
}
