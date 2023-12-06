import database from "infra/database.js";
import { Client } from "pg";

import query from "psql/lib/query";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const dbVersionResult = (await database.query("SHOW server_version;")).rows[0]
    .server_version;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: dbVersionResult,
      },
    },
  });
}

export default status;
