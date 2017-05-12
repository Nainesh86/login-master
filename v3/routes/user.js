const userController = require('../controller/userController');
const validController = require('../controller/validController');
const constants = require(appRoot+'/common/constants');
const path = require('path');
const LoginResponse = require(appRoot+'/common/login_response');
const validator = require('../validation');
const isvalid = require('isvalid');

var version = "v3";

    module.exports = function (server) {

        server.get("/user", function (request, response) {
                                validController.validUser(request,response);
                            });

    server.post(version+"/login", function (request, response) {

                            isvalid(request.body, validator.login, function (err, validData) {
                                if(err) {
                                        console.log(err);
                                        if (request.body == validator.login) {
                                            var customResponse = new LoginResponse(response);
                                            customResponse.setResponseBody({errors: err.message.message});
                                        }
                                    }
                                    else{
                                        userController.login(request,response);
                                    }
                                })
                            });
                        };