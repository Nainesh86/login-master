global.appRoot =  __dirname+'/';

const Restify = require('restify');
var path = require('path');
const config = require(appRoot+'/app_config.js');
const winston = require('winston');
const constants = require(appRoot+'/common/constants');
const userController = require('./v3/controller/userController');
const validator = require('validator');
const LoginResponse = require(appRoot+'/common/login_response');
const jwt = require('jsonwebtoken');
const valid = require('./v3/controller/validController');
var server = Restify.createServer( {
    name: 'login',
    versions: ['1.0.0']
    // formatters: {
    //     'application/foo': function formatFoo(req, res, body, cb) {
    //         console.log(body.stack);
    //         if (body instanceof Error)
    //             return body.stack;
    //
    //         if (Buffer.isBuffer(body))
    //             return cb(null, body.toString('base64'));
    //
    //         return cb(null, util.inspect(body));
    //     }
    // }
});

server.use(Restify.queryParser());
server.use(Restify.jsonBodyParser());

server.use(function (request,response,next) {

    var pathArray = request.route.path.split("/");
    var apiVersion = pathArray[0];
    var ignorePath = apiVersion + "/login";

        if (ignorePath.indexOf(request.route.path) == -1) {

                var loginResponse = new LoginResponse(response);
                var bearerHeader = request.headers["authorization"];

                    token = jwt.sign({username: request.body}, 'super_secret',{expiresIn: 60 * 60});
                if (bearerHeader.isEmpty == true) {
                             loginResponse.setStatusCode(LoginResponse.TOKEN_NOT_FOUND)
                            .setResponseBody({Error: constants.ERROR.TOKEN_NOT_FOUND})
                            .send();
                         }
                        else if(!validator.contains(bearerHeader,"Bearer")){
                                      loginResponse.setStatusCode(LoginResponse.INVALID_ACCESS_TOKEN)
                                            .setResponseBody({Error:constants.ERROR.INVALID_TOKEN})
                                            .send();
                                    }
                                        else{
                                             bearer = bearerHeader.replace("Bearer ","");

                                                   jwt.verify(bearer, 'super_secret', function (err, decoded) {

                                                    console.log(err);
                                                    console.log(decoded);
                                                    if(err){
                                                        loginResponse.setStatusCode(LoginResponse.TOKEN_EXPIRED)
                                                            .setResponseBody({Error: constants.ERROR.TOKEN_EXPIRED})
                                                            .send();
                                                    }
                                                        else {
                                                        request.token = decoded;
                                                        next();
                                                    }
                                            })
                                        }
                                    }
                            else {
                                next();
                            }
                        });

        var routes = require('./routes')(server);

server.listen(config.ENV_CONFIG.server.port,config.ENV_CONFIG.server.ip,function(err){
    console.log("Server Url at : "+server.url);
});