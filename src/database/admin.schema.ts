import {
    pgTable,
    serial,
    timestamp,
    text,
    integer,
    pgEnum,
} from 'drizzle-orm/pg-core';

// ✅ Define Enums First
export const boardStatusEnum = pgEnum('board_status', ['active', 'inactive']);
export const mediumStatusEnum = pgEnum('medium_status', ['active', 'inactive']);

export const board = pgTable('board', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    status: boardStatusEnum('status').notNull().default('active'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    deletedAt: timestamp('deleted_at'),
});

export const medium = pgTable('medium', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    status: mediumStatusEnum('status').notNull().default('active'), 
    boardId: integer('board_id').notNull().references(() => board.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    deletedAt: timestamp('deleted_at').defaultNow(),
});
