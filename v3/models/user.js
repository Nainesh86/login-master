
module.exports = function (sequelize , DataTypes) {
    var users = sequelize.define('user',{
        username: DataTypes.STRING(100),
        password: DataTypes.STRING(100)
        },
        {
        tableName: "user"
});
    return users;
};

