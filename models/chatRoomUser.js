module.exports = function (sequelize, DataTypes) {
    const room_user_mtrx = sequelize.define(
        "room_user_mtrx",
        {
            ru_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            room_guid: {
                type: DataTypes.UUID,
                allowNull: false
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false
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
            tableName: "room_user_mtrx",
            timestamps: true,
            underscored: true
        }
    );

    room_user_mtrx.associate = models => {
        room_user_mtrx.belongsTo(models.room_mst, {
            foreignKey: "room_guid"
        });
    };

    room_user_mtrx.sync({});
    return room_user_mtrx;
};
