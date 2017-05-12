const path = require('path');
const models = require("../models");
const logger = require('../logger');
const LoginResponse = require(appRoot+'/common/login_response');
const constants = require(appRoot+'/common/constants');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
var sequelize = new Sequelize('db', 'root', '12345678',{
    logging: false
});

module.exports = {

    login: function (request, response, next) {
        var customResponse = new LoginResponse(response);

            sequelize.query("SELECT * FROM user", {
                type: sequelize.QueryTypes.SELECT

            }).then(function (user) {

                    if (request.body.username == user[0].username && request.body.password == user[0].password) {
                            //var tokenExpired = "2h";
                        var token = jwt.sign({username: request.body.username, password:request.body.password}, 'super_secret',{expiresIn: 60 * 60});
                            if (token) {
                                customResponse.setStatusCode(LoginResponse.SUCCESS_CODE)
                                    .setResponseBody({Success: constants.ERROR.SUCCESS_LOGIN,username: user[0].username,Token: token})
                                    .send();
                                 }
                                else {
                                    customResponse.setStatusCode(LoginResponse.INVALID_ACCESS_TOKEN)
                                        .setResponseBody({Error: constants.ERROR.TOKEN_NOT_FOUND})
                                        .send();
                                    }
                                 }
                            else {
                                customResponse.setStatusCode(LoginResponse.INVALID_USERNAME)
                                    .setResponseBody({Error: constants.ERROR.INVALID_USERNAME})
                                    .send();
                                 }
                            }).catch(function (error) {
                                logger.logDbError(error, request);
                                customResponse.setStatusCode(LoginResponse.DATABASE_ERROR)
                                    .setResponseBody({Error: constants.ERROR.DATABASE_ERROR})
                                    .send();
                            });
                            return next;
                        }
                    };
