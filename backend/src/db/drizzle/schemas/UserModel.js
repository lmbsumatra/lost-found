const {
  int,
  serial,
  varchar,
  mysqlTable,
  timestamp,
} = require("drizzle-orm/mysql-core");
const { relations } = require("drizzle-orm");

const usersTable = mysqlTable("users", {
  id: serial("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
    () => new Date()
  ),
});

// circular dependency: resolved: tabes should be define and import first then pass to create relations
const usersRelations = (tables) => {
  const { lostItemsTable, foundItemsTable } = tables;
  return relations(usersTable, ({ many }) => ({
    lostItems: many(lostItemsTable),
    foundItems: many(foundItemsTable),
  }));
};

module.exports = { usersTable, usersRelations };
