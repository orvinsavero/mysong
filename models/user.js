'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    country: DataTypes.STRING,
    money: DataTypes.STRING,
    gender: DataTypes.STRING,
    role: DataTypes.STRING
  }, {});
  User.getKeys = function(){
    let key = Object.keys(this.rawAttributes)
    let result = []
    for (let i = 0; i < key.length; i++){
      if (key[i] !== 'createdAt' && key[i] !== 'updatedAt'){
        result.push(key[i])
      }
    }
    return result
  }
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Log);
		User.belongsToMany(models.Song, {through: "Log", foreignKey: "UserId"});
  };
  return User;
};