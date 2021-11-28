const { createHash } = require('crypto');
const VERSION = '1';
const SHA = 'sha1';

module.exports = {
    SHA,
    MAGIC_KEY: '_coverageSchema',
    MAGIC_VALUE: createHash(SHA)
        .update('istanbul-lib-instrument' + '@' + VERSION)
        .digest('hex')
};
