const winston = require('./winston.middleware');
module.exports = (app) => {
    app.use((req, res, next) => {
        // This middleware throws an error, so Express will go straight to
        // the next error handler
        setImmediate(() => { next(new Error('whoops')); });
    });

    app.use((error, req, res, next) => {
        // Any request to this server will get here, and will send an HTTP
        // response with the error message 'woops'
        winston.error(winston.combinedFormat(error, req, res));
        res.json({
            success: false,
            message: error
        })
    })
}