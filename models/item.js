module.exports = (sequelize, DataTypes) => {

    const Item = sequelize.define('item', {
        nameOfItem: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        owner: {
            type: DataTypes.INTEGER,
        }
    })
    return Item
}