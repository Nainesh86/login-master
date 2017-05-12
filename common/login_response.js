const path = require('path');


function LoginResponse(response){
    this.statusCode = 1001;
    this.body = [];
    this.response = response;
}

LoginResponse.SUCCESS_CODE = 1000;
LoginResponse.UNKNOWN_ERROR= 1002;
LoginResponse.DATABASE_ERROR = 1003;
LoginResponse.INVALID_USERNAME = 1004;
LoginResponse.INVALID_PASSWORD = 1005;
LoginResponse.INVALID_DATA_TYPE = 1006;
LoginResponse.USERNAME_REQUIRED = 1007;
LoginResponse.ER_USERNAME_NO_MATCH = 1008;
LoginResponse.PASSWORD_REQUIRED = 1007;
LoginResponse.ER_PASSWORD_NO_MATCH = 1008;
LoginResponse.REQUIRE_FIELD = 1009;
LoginResponse.INVALID_ACCESS_TOKEN = 1010;
LoginResponse.TOKEN_EXPIRED = 1011;
LoginResponse.TOKEN_ERROR = 1012;
LoginResponse.TOKEN_NOT_FOUND = 1013;
LoginResponse.TOKEN_FOUND = 1014;

LoginResponse.prototype.setStatusCode = function (statusCode) {
    this.statusCode = statusCode;
    return this;
};
    LoginResponse.prototype.setResponseBody = function (responseBody) {
    this.body = responseBody;
    return this;
};

LoginResponse.prototype.send = function () {
    var responseBody = {
        statusCode: this.statusCode
    };

    for (var key in this.body) {
        responseBody[key] = this.body[key];
    }

       this.response.send(responseBody);
};

module.exports = LoginResponse;
