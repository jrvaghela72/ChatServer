module.exports = function (sequelize, DataTypes) {
    const room_mst = sequelize.define(
        "room_mst",
        {
            room_guid: {
                primaryKey: true,
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: true
            },
            type: {
                type: DataTypes.STRING(100),
                allowNull: true
            },
            group_icon: {
                type: DataTypes.STRING(500),
                allowNull: true
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
            tableName: "room_mst",
            timestamps: true,
            underscored: true
        }
    );

    room_mst.associate = models => {
        room_mst.hasMany(models.room_user_mtrx, {
            foreignKey: "room_guid",
        });
    };

    room_mst.sync({});
    return room_mst;
};
