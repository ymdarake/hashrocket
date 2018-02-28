const crypto = require('crypto')
const algorithm = 'sha512'
const saltLengthByte = 32
const stretchRepetition = 100

module.exports = {
    hashWithSalt: function (originalData, salt) {
        return Buffer.concat([salt, Buffer.from(this.stretch(originalData, salt))])
    },
    scrapeSalt: function (base64EncodedHashString) {
        return new Buffer(base64EncodedHashString, 'base64').slice(0, saltLengthByte)
    },
    genSalt: function () {
        return crypto.randomBytes(saltLengthByte)
    },
    stretch: function (originalData, salt) {
        let result
        for (let i = 0; i < stretchRepetition; ++i) {
            let hasher = crypto.createHash(algorithm)
            hasher.update(salt + result + originalData)
            result = hasher.digest()
        }
        return result
    }
}
