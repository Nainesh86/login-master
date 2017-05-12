

var app = {
    db: {
        "userName": "root",
        "password": "12345678",
        "database": "db",
        "host": "localhost",
        "dialect": "mysql",
        "port": 8080,
        "define": {
            "timestamps": false
        }
    },
    server: {
        ip: "127.0.0.1",
        port: 8080
    },
    user:{
        username: "nainesh",
        password: "nainesh"
    }
};

module.exports.ENV_CONFIG = app;