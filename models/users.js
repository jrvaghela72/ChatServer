/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
    const Users = sequelize.define(
        "users",
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            user_name: {
                type: DataTypes.STRING(300),
                allowNull: false,
            },
            full_name: {
                type: DataTypes.STRING(300),
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING(1000),
                allowNull: true,
            },
            email: {
                type: DataTypes.STRING(300),
                allowNull: true,
            },
            password: {
                type: DataTypes.STRING(300),
                allowNull: true,
            },
            title: {
                type: DataTypes.STRING(30),
                allowNull: true,
            },
            user_image: {
                type: DataTypes.STRING(500),
                allowNull: true,
            },
            otp: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            is_active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true,
            },
            is_deleted: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false,
            },
            entry_by: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            entry_date_time: {
                type: DataTypes.STRING(100),
                allowNull: true,
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
            },
        },
        {
            tableName: "users",
            timestamps: true,
            underscored: true,
        }
    );
    Users.sync({ alter: true });
    return Users;
};
