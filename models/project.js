module.exports = function(sequelize, DataTypes) {
    const Project = sequelize.define("Project", {
        projectName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        projectDesc: {
            type: DataTypes.STRING,
            allowNull: false
        }        
    });

    Project.associate = function(models) {
        Project.belongsTo(models.User);
        Project.hasMany(models.Task, {
            onDelete: "cascade"
        });
    };

    return Project;
}