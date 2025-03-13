const {
  timestamp,
  text,
  mysqlEnum,
  varchar,
  int,
  mysqlTable,
  serial,
} = require("drizzle-orm/mysql-core");
const { relations } = require("drizzle-orm");

const { usersTable } = require("./UserModel");

const foundItemsTable = mysqlTable("found_items", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  userId: int("user_id")
    .notNull()
    .references(() => usersTable.id), // circular dependency warning: resolve: changed order of imports on schema
  description: text("description"),
  category: mysqlEnum("category", [
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
  ]).default("Others"),
  locationFound: varchar("location_found", { length: 255 }),
  dateFound: timestamp("date_found", { mode: "date" }),
  status: mysqlEnum("status", ["pending", "matched", "resolved"]).default(
    "pending"
  ),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
    () => new Date()
  ),
});

// circular dependency: resolved: tabes should be define and import first then pass to create relations
const foundItemsRelations = (tables) => {
  const { usersTable } = tables;
  return relations(foundItemsTable, ({ one }) => ({
    user: one(usersTable, {
      fields: [foundItemsTable.userId],
      references: [usersTable.id],
    }),
  }));
};

module.exports = { foundItemsTable, foundItemsRelations };
