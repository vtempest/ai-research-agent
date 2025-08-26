import { integer, sqliteTable, text, primaryKey } from "drizzle-orm/sqlite-core"


/****************** INDEX & CHATS *******************/

export const articles = sqliteTable('articles', {
  id: text('id').primaryKey(),
  cite: text('cite').notNull(),
  html: text('html').notNull(),
  url: text('url').notNull(),
  author: text('author'),
  author_cite: text('author_cite').notNull(),
  author_type: integer('author_type'),
  date: text('date'),
  title: text('title'),
  source: text('source'),
  word_count: integer('word_count').notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }),
  updatedAt: integer("updated_at", { mode: "timestamp" })
});


export const messages = sqliteTable("messages", {
  id: integer("id").primaryKey(),
  content: text("content").default(""),
  chatId: text("chatId").default(""),
  messageId: text("messageId").default(""),
  role: text("type", { enum: ["assistant", "user"] }),
  metadata: text("metadata", {mode: "json"}),
  createdAt: integer("created_at", { mode: "timestamp" }),

});

export const chats = sqliteTable("chats", {
  id: text("id").primaryKey(),
  title: text("title").default(""),
  createdAt: text("createdAt").default(""),
  focusMode: text("focusMode").default(""),
});

export const userFavorites = sqliteTable("user_favorites", {
  id: text("id").primaryKey(),
  userId: text("userId")
  .notNull()
  .references(() => user.id, { onDelete: "cascade" }),
  articleId: text("articleId")
  .notNull()
  .references(() => articles.id, { onDelete: "cascade" }),
  createdAt: integer("created_at", { mode: "timestamp" }),
});


export const userMemories = sqliteTable('user_memories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text("userId")
  .notNull()
  .references(() => user.id, { onDelete: "cascade" }),
  memoryType: text('memory_type').notNull(),
  content: text('content').notNull(),
  importance: integer('importance').notNull().default(1),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(new Date()),
});

/**************  FILES & TEAMS  ****************/
export const files = sqliteTable("files", {
  id: text("id").primaryKey(),
  title: text("title").default(""),
  public: integer("public", { mode: "boolean" }).default(false),
  ownerId: text("ownerId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  content: text("content").default(""),
  metadata: text("metadata", { mode: "json"}),
  sharedUserIds: text("shared_user_ids", { mode: "json" }).default("[]"),
  sharedTeamIds: text("shared_team_ids", { mode: "json" }).default("[]"),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }),
});
 

export const teams = sqliteTable("teams", {
  id: text("id").primaryKey(),
  name: text("name").default(""),
  users: text("users", { mode: "json" }).default("[]"),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
  ownerId: text("ownerId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  metadata: text("metadata", {  mode: "json"})
})

export const userFileIndex = sqliteTable("user_file_index", {
  userId: text("user_id").default("").primaryKey(),
  fileIds: text("file_ids", { mode: "json" }).default("[]"),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
});


/**************  USER & AUTH MODELS  ****************/

export const user = sqliteTable("user", {
  settings: text("settings").default(""),
  subscription: text("subscription").default(""),

  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" })
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", {
    mode: "timestamp",
  }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", {
    mode: "timestamp",
  }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});






