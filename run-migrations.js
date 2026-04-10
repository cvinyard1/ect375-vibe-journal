import { supabase } from "../lib/supabase.js";
import { readFileSync } from "fs";
import { join } from "path";

async function runMigrations() {
  try {
    console.log("Running database migrations...");

    // Read and execute migration files in order
    const migrations = [
      "001_create_projects_table.sql",
      "002_create_materials_table.sql",
      "003_create_material_prices_table.sql",
      "004_enable_rls_policies.sql"
    ];

    for (const migration of migrations) {
      console.log(`Executing ${migration}...`);
      const sql = readFileSync(join("supabase", "migrations", migration), "utf8");

      const { error } = await supabase.rpc("exec_sql", { sql });

      if (error) {
        console.error(`Error in ${migration}:`, error);
        throw error;
      }

      console.log(`✅ ${migration} completed`);
    }

    console.log("🎉 All migrations completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

runMigrations();