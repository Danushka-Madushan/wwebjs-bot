const { ReNumber } = require("./regex")

const accesslist = {
    from: [
        '94764958088',
    ],
    to: [
        '94764958088',
        '120363043597628340'
    ],
    author: [
        '94764958088',
    ]
}

const hasPermissions =  {
    author: (number) => {
        return accesslist.author.includes(ReNumber(number))
    },
    from: (number) => {
        return accesslist.from.includes(ReNumber(number))
    },
    to: (number) => {
        return accesslist.to.includes(ReNumber(number))
    }
}

module.exports = hasPermissions
