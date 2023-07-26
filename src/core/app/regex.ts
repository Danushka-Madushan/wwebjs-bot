export const ReNumber = (number: string) => {
    return RegExp(`(?<number>[0-9]+)(?:@|:[0-9]{2}@)`, 's').exec(number)?.groups?.number || ""
}
