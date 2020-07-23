module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        name: DataTypes.STRING,
        username: {
            unique: true,
            allowNull: false,
            type: DataTypes.STRING
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING
        }
    }, {
        tableName: "users"
    });

    User.associate = models => {
        User.hasMany(models.TodoList, { foreignKey: "user_id" });
    };

    return User;
}