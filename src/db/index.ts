import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { Invoices } from "./schema";

const pool = new Pool({
  connectionString: process.env.XATA_DATABASE_URL,
  max: 20,
});
export const db = drizzle(pool, {
  schema: {
    Invoices,
  },
});

// const tableName = pgTable("tableName", {
//   xata_id: text("xata_id").primaryKey(),
// });

// const record = await db
//   .select()
//   .from(tableName)
//   .where(eq(tableName.xata_id, "rec_xyz"))
//   .execute();
// console.log(record);
