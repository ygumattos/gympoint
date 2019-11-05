

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'plans',
    [
      {
        title: 'Start',
        duration: 1,
        price: 129,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('plans', null, {}),
};
