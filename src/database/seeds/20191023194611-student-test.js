

module.exports = {
    up: (queryInterface) => queryInterface.bulkInsert(
      'students',
      [
        {
          name: 'Aluno1',
          email: 'aluno01@gympoint.com',
          age: 20,
          weight: 70.9,
          height: 2.6,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    ),

    down: (queryInterface) => queryInterface.bulkDelete('students', null, {}),
};
