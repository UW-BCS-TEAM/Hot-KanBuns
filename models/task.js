module.exports = function(sequelize, DataTypes){
    const Task = sequelize.define("Task", {
        taskName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        taskDesc: {
            type: DataTypes.STRING,
            allowNull: false
        },
        taskStatus: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "todo"
        },
        taskPriority: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "low"
        }
    });

    Task.associate = function(models) {
        Task.belongsTo(models.Project);
        Task.belongsToMany(models.User, {through: "assignedTasks"});
    }
    return Task;
};