//Cross Origin Resource Sharing
const whitelist = require('./whitelist')

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1  /* remove after dev -> */ || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions