const ReGoogleSearch = new RegExp(`<p>Source.+?href="(?<slink>https://w{3}.google.com/search\\?.+?)".target="_blank">|<p>Source:(?<sname>.+?)</p>`, 'g')
const ReHentaiBruh = new RegExp(`(?<link>https://w{3}\\.henteibruh\\.com/20[0-9]{2}/[0-9]{2}/.+\\.(?:html|htm))`, '')

const ReNumber = (number) => {
    return RegExp(`(?<number>[0-9]+)(?:@|:[0-9]{2}@)`, 's').exec(number).groups.number
}

module.exports = { ReGoogleSearch, ReHentaiBruh, ReNumber }
