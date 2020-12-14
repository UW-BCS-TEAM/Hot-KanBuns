const author = require("../../../webdev/uw-sea-fsf-pt-03-2020-u-c/14-Full-Stack/01-Activities/13-Post-Author-Association/Solved/models/author");

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