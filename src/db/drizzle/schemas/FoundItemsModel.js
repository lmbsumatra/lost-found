const { 
  timestamp, 
  text, 
  mysqlEnum, 
  varchar, 
  int, 
  mysqlTable, 
  serial 
} = require("drizzle-orm/mysql-core");
const { relations } = require("drizzle-orm");

const foundItemsTable = mysqlTable("found_items", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  userId: int("user_id").notNull(),
  description: text("description"),
  category: mysqlEnum("categories", [
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
  status: mysqlEnum("statuses", ["pending", "matched", "resolved"]).default(
    "pending"
  ),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
    () => new Date()
  ),
});

// Defer relations to avoid circular dependencies
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