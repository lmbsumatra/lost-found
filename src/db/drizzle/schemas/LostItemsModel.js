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

const lostItemsTable = mysqlTable("lost_items", {
  id: serial("id").primaryKey(),
  userId: int("user_id").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
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
  locationLost: varchar("location_lost", { length: 255 }),
  dateLost: timestamp("date_lost", { mode: "date" }),
  status: mysqlEnum("statuses", ["pending", "matched", "resolved"]).default(
    "pending"
  ),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
    () => new Date()
  ),
});

// Defer relations to avoid circular dependencies
const lostItemsRelations = (tables) => {
  const { usersTable } = tables;
  return relations(lostItemsTable, ({ one }) => ({
    user: one(usersTable, {
      fields: [lostItemsTable.userId],
      references: [usersTable.id],
    }),
  }));
};

module.exports = { lostItemsTable, lostItemsRelations };