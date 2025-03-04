const { int, serial, varchar, mysqlTable } = require("drizzle-orm/mysql-core");

const userTable = mysqlTable("usertry", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  age: int("age").notNull(),
});

module.exports = {userTable};
