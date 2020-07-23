module.exports = (sequelize, DataTypes) => {
    const TodoList = sequelize.define("TodoList", {
        task: {
            unique: true,
            allowNull: false,
            type: DataTypes.STRING
        }
    }, {
        tableName: "todolists",
        timestamps: false
    });

    TodoList.associate = models => {
        TodoList.belongsTo(models.User, { foreignKey: "user_id" });
    };

    return TodoList;
}