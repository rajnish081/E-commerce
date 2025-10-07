import { pgTable, text, uuid, foreignKey, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { z } from 'zod';

export const categories = pgTable('categories', {
  // CORE FIELDS
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  parentId: uuid('parent_id'),

  // TIMESTAMPS
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (t) => ([ // <-- The fix is here: using an array [ ]
  foreignKey({
    columns: [t.parentId],
    foreignColumns: [t.id],
    name: 'category_parent_fk',
  }).onDelete('set null'),
]));

// ... the rest of your file (relations, zod schemas) does not need to change.

export const categoriesRelations = relations(categories, ({ many, one }) => ({
  parent: one(categories, {
    fields: [categories.parentId],
    references: [categories.id],
  }),
  children: many(categories),
}));

export const insertCategorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  parentId: z.uuid().optional().nullable(),
});
export const selectCategorySchema = insertCategorySchema.extend({
  id: z.uuid(),
});
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type SelectCategory = z.infer<typeof selectCategorySchema>;

