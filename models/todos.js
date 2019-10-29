'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todos = sequelize.define('todos', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    completed: DataTypes.BOOLEAN,
    dateActivity: DataTypes.DATE
  }, {});
  Todos.associate = function(models) {
    // associations can be defined here
  };
  return Todos;
};