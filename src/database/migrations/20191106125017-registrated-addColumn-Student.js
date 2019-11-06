

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('students', 'registrated', {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          default: false
        });
    },
  down: queryInterface => {
        return queryInterface.removeColumn('students', 'registrated');
      },
};
