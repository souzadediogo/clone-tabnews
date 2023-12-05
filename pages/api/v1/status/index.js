import database from "infra/database.js";
import getPostgresVersion from "infra/database.js";
import query from "psql/lib/query";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const dbVersion = await database.query("SELECT version();");
  console.log(dbVersion);
  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: dbVersion,
      },
    },
  });
}

export default status;
