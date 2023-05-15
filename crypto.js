module.exports.createChallenge = (work) => {
    const data = `${work}${new Date().getTime()}`
    return Buffer.from(data).toString('base64')
}
