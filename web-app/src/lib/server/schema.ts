import { integer, sqliteTable, text, primaryKey } from "drizzle-orm/sqlite-core"

/****************** FILES INDEX & CHATS *******************/


export const articles = sqliteTable('articles', {
  cite: text('cite').notNull(),
  html: text('html').notNull(),
  url: text('url').notNull(),
  author: text('author').notNull(),
  author_cite: text('author_cite').notNull(),
  author_type: integer('author_type').notNull(),
  date: text('date').notNull(),
  title: text('title').notNull(),
  source: text('source').notNull(),
  word_count: integer('word_count').notNull(),
});


export const messages = sqliteTable("messages", {
  id: integer("id").primaryKey(),
  content: text("content").default(""),
  chatId: text("chatId").default(""),
  messageId: text("messageId").default(""),
  role: text("type", { enum: ["assistant", "user"] }),
  metadata: text("metadata", {
    mode: "json",
  }),
});

export const chats = sqliteTable("chats", {
  id: text("id").primaryKey(),
  title: text("title").default(""),
  createdAt: text("createdAt").default(""),
  focusMode: text("focusMode").default(""),
});

export const files = sqliteTable("files", {
  id: text("id").primaryKey(),
  title: text("title").default(""),
  content: text("content").default(""),
  users: text("users").default(""),
  lastUpdated: integer("last_updated", { mode: "timestamp" }),
});

export const userFileIndex = sqliteTable("user_file_index", {
  userId: text("user_id").default("").primaryKey(),
  fileId: text("file_id").default(""),
});


/**************  AUTH MODELS  ****************/

export const users = sqliteTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  image: text("image"),
  subscription: integer("subscription").default(0),
  avatarUrl: text("avatar_url"),
  isAdmin: integer("is_admin", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).$default(
    () => new Date()
  ),
  modifiedAt: integer("modified_at", { mode: "timestamp_ms" }).$onUpdate(
    () => new Date()
  ),
  settings: text("settings").default(""),
});


export const sessions = sqliteTable("sessions", {
  id: text("id")
    .$defaultFn(() => crypto.randomUUID()),
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
})


export const accounts = sqliteTable(
  "accounts",
  {
    id: text("id")
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    oauth_token: text("oauth_token"),
    oauth_token_secret: text("oauth_token_secret"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)
export const verificationTokens = sqliteTable(
  "verification_tokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
)