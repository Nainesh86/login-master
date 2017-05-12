const validate = require('validate.js');
const constants = require(appRoot+'/common/constants');
const userController = require(appRoot+'/v3/controller/userController');
const LoginResponse = require(appRoot+'/common/login_response');

module.exports = {
    login:{
        type: Object,
        unknownKeys: 'allow',
        schema: {
            'username': {
                type: String,
                required: true,
              errors: {
                    required: {
                        errorCode: LoginResponse.USERNAME_REQUIRED,
                        message: constants.ERROR.USERNAME_REQUIRED
                    },
                    type: {
                        errorCode: LoginResponse.INVALID_DATA_TYPE,
                        message: constants.ERROR.INVALID_DATA_TYPE
                    }
                }
            },
            'password': {
                type: String,
                required: true,

                errors: {
                    required: {
                        errorCode: LoginResponse.PASSWORD_REQUIRED,
                        message: constants.ERROR.PASSWORD_REQUIRED
                    },
                    type: {
                        errorCode: LoginResponse.INVALID_DATA_TYPE,
                        message: constants.ERROR.INVALID_DATA_TYPE
                    }
                }
            }
        }
    }
};