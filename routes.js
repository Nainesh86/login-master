
module.exports = function (server) {
    var versionPath = "v3";

    require("./" + versionPath + "/routes/user")(server);
};
