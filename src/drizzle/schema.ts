// src/core-modules/drizzle/schema.ts
import {
    pgTable,
    serial,
    timestamp,
    text,
    integer,
  } from 'drizzle-orm/pg-core';
  
  export const posts = pgTable('posts', {
    id: serial('id').primaryKey(),
    authorId: integer('author_id').notNull(),
    content: text('content'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  });
  