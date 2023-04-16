module.exports = function (sequelize, DataTypes) {
    let alias = "Product"
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.INTEGER
        },
        discount: {
            type: DataTypes.INTEGER
        },
        bestSellers: {
            type: DataTypes.STRING
        },
        stock: {
            type: DataTypes.INTEGER
        },
        reviews: {
            type: DataTypes.INTEGER
        },
        deliveryDate: {
            type: DataTypes.DATE
        },
        description: {
            type: DataTypes.STRING
        },
        sliderImage: {
            type: DataTypes.STRING
        },
        id_category: {
            type: DataTypes.INTEGER
        },
    }
    let config = {
        tableName: "products", //name of the table in DB
        timestamps: false
    }

    let Product = sequelize.define(alias, cols, config)


    Product.associate = function (models) {   // un producto tiene un solo genero
        Product.belongsTo(models.Category, {
            as: "category",
            foreignKey: "id_category"
        })
        Product.belongsToMany(models.Purchase, {
            as: 'compras',
            through: 'products_purchase',
            foreignKey : 'id_product',
            otherKey : 'id_purchase',
            timestamps: false
          }),
          Product.hasMany(models.Cart, {
            as: "cart",
            foreignKey: "productId"
        })
    }
    

return Product

}