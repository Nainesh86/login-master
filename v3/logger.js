var winston = require('winston');

var Logger = function () {};

Logger.logDbError = function (error,request) {
    winston.log('error',
        error.message,
        {
            request_route:request.route.path,
            request_params:(request.body || request.params),
            query:error.sql
        }
    );
};
module.exports = Logger;
