const { faker } = require("@faker-js/faker");

const generateFakeUsers = async (count = 10) => {
  return Array.from({ length: count }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number().slice(0, 20),
    password: faker.internet.password(),
  }));
};

module.exports = { generateFakeUsers };
