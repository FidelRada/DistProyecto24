const crypto = require('crypto');

function generateSHA256(input) {
    const hash = crypto.createHash('sha256');
    hash.update(input);
    return hash.digest('hex');
}

/*/ Ejemplo de uso
const inputString = 'Hello, world!';
const sha256Hash = generateSHA256(inputString);
console.log('SHA-256 Hash:', sha256Hash);
*/

module.exports = {
    generateSHA256
}