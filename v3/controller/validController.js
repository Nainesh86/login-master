const LoginResponse = require(appRoot+'/common/login_response.js');
const constants = require(appRoot+'/common/constants');
const path = require('path');

module.exports = {
            validUser: function (request, response) {

                           var customResponse = new LoginResponse(response);

                        customResponse.setResponseBody({Message: "Welcome to Api!!!"})
                            .send();
                   }
                };
