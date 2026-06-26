import { DataTypes, Model } from "sequelize";
import sequelize from "./dbconfig.js"

class Potion extends Model {}
Potion.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    imagem: {
      type: DataTypes.STRING,
      allowNull: false
    },
    preco: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }},
    {
      sequelize: sequelize,
      modelName: 'Potion',
      timestamps: false
    }
)

export default Potion