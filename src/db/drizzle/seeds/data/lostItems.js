const { faker } = require("@faker-js/faker");
const db = require("../../db_connection");
const { schema } = require("../../schemas");

const getUserIdsFromDB = async () => {
  try {
    const users = await db
      .select({ id: schema.usersTable.id })
      .from(schema.usersTable);
    return users.map((user) => user.id);
  } catch (error) {
    console.error("Error fetching user IDs:", error);
    return [];
  }
};

const generateFakeLostItems = async (count = 10) => {
  // const userIds = await getUserIdsFromDB();
  const dateLost = faker.date.past();

  // if (userIds.length === 0) {
  //   throw new Error(
  //     "No users found in the database. Cannot generate lost items."
  //   );
  // }

  return Array.from({ length: count }, () => ({
    userId: 1,
    name: faker.commerce.productName(),
    category: faker.helpers.arrayElement([
      "Others",
      "Personal",
      "Electronics",
      "Gadgets",
      "Documents",
      "ID",
      "Wearables",
      "Accessories",
      "Clothing",
      "School Materials",
    ]),
    description: faker.commerce.productDescription(),
    locationLost: `${faker.location.streetAddress()}, ${faker.location.city()}`,
    status: "pending",
    dateLost: dateLost,
  }));
};

module.exports = { generateFakeLostItems };
