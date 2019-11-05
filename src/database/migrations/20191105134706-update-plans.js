

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.changeColumn(
        'plans',
        'title',
        {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        }
      )

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'plans',
      'title',
      {
        type: Sequelize.STRING,
        allowNull: false,
      }
    )
  }
};
