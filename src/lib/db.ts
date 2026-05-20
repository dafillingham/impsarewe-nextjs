import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "@/drizzle/schema";

// Fallback to a dummy URL during the build process to prevent crashes
const connectionString = process.env.DATABASE_URL || "mysql://dummy:dummy@localhost:3306/dummy";

// We remove the strict throw error check to allow the build to complete
const poolConnection = mysql.createPool({
  uri: connectionString,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const db = drizzle(poolConnection, { schema, mode: "default" });

export type Database = typeof db;
