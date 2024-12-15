import {
  sqliteTable,
  text,
  integer,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import {  generateId } from "lucia";

import {
  TOKEN_EXPIRATION_TIME,
  TOKEN_LEN,
  USER_ID_LEN,
} from "$lib/middleware/validations";

/****************** USER AUTH OBJECTS *******************/

export const users = sqliteTable("users", {
  id: text("id", { length: USER_ID_LEN }).notNull().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password"),
  username: text("username").notNull().unique(),
  authMethods: text("auth_methods", { mode: "json" }).notNull(),
  avatarUrl: text("avatar_url"),
  apiKey: text("api_key").unique(),
  isVerified: integer("is_verified", { mode: "boolean" })
    .notNull()
    .default(false),
  isAdmin: integer("is_admin", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$default(() => new Date()),
  modifiedAt: integer("modified_at", { mode: "timestamp_ms" }).$onUpdate(
    () => new Date()
  ),
  settings: text("settings"),

});

export const tokens = sqliteTable("tokens", {
  token: text("token", { length: TOKEN_LEN })
    .primaryKey()
    .$default(() => generateId(TOKEN_LEN)),
  expiresAt: integer("expires_at", { mode: "timestamp_ms" })
    .notNull()
    .$default(() => new Date(Date.now() + TOKEN_EXPIRATION_TIME * 60 * 1000)),
  type: text("type", {
    enum: ["email_change", "email_verification", "password_reset"],
  }),
  email: text("email").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const sessions = sqliteTable("sessions", {
  id: text("id", { length: 40 }).notNull().primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const oauthAccounts = sqliteTable(
  "oauth_accounts",
  {
    providerId: text("provider_id", { enum: ["email", "google"] }).notNull(),
    providerUserId: text("provider_user_id").notNull(),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .notNull()
      .$default(() => new Date()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (t) => ({ pk: primaryKey({ columns: [t.providerId, t.providerUserId] }) })
);



/****************** FILES INDEX & CHATS *******************/

export const messages = sqliteTable("messages", {
  id: integer("id").primaryKey(),
  content: text("content").notNull(),
  chatId: text("chatId").notNull(),
  messageId: text("messageId").notNull(),
  role: text("type", { enum: ["assistant", "user"] }),
  metadata: text("metadata", {
    mode: "json",
  }),
});

export const chats = sqliteTable("chats", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  createdAt: text("createdAt").notNull(),
  focusMode: text("focusMode").notNull(),
});

export const files = sqliteTable("files", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  users: text("users").notNull(),
  lastUpdated: integer("last_updated", { mode: "timestamp" }).notNull(),
});

export const userFileIndex = sqliteTable("user_file_index", {
  userId: text("user_id").notNull().primaryKey(),
  fileId: text("file_id").notNull(),
});
