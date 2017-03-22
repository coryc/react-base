if (process.env.NODE_ENV === 'production') {
    module.exports = require('./ConfigureStore/store.prod')
} else {
    module.exports = require('./ConfigureStore/store.dev')
}
