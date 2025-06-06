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
  .references(() => users.id, { onDelete: "cascade" }),
  articleId: text("articleId")
  .notNull()
  .references(() => articles.id, { onDelete: "cascade" }),
  createdAt: integer("created_at", { mode: "timestamp" }),
});

/**************  FILES & TEAMS  ****************/
export const files = sqliteTable("files", {
  id: text("id").primaryKey(),
  title: text("title").default(""),
  public: integer("public", { mode: "boolean" }).default(false),
  ownerId: text("ownerId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
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
      .references(() => users.id, { onDelete: "cascade" }),
  metadata: text("metadata", {  mode: "json"})
})

export const userFileIndex = sqliteTable("user_file_index", {
  userId: text("user_id").default("").primaryKey(),
  fileIds: text("file_ids", { mode: "json" }).default("[]"),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
});


/**************  USER & AUTH MODELS  ****************/

export const users = sqliteTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  image: text("image"),
  subscription: text("subscription").default(""),
  isAdmin: integer("is_admin", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).$default(
    () => new Date()
  ),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).$onUpdate(
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






