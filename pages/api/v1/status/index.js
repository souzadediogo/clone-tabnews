import database from "infra/database.js";
import { Client } from "pg";

import query from "psql/lib/query";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const dbVersionResult = (await database.query("SHOW server_version;")).rows[0]
    .server_version;

  const databaseMaxConnectionsResult = await database.query(
    "SHOW max_connections",
  );
  // console.log()
  const databaseMaxConnectionsValue =
    databaseMaxConnectionsResult.rows[0].max_connections;

  // const databaseOpenedConnections = (
  //   await database.query(
  //     "SELECT count(*)::int from pg_stat_activity where datname = 'local_db';",
  //   )
  // ).rows[0].count;
  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnections = (
    await database.query({
      text: `SELECT count(*)::int from pg_stat_activity where datname = $1;`,
      values: [databaseName],
    })
  ).rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: dbVersionResult,
        max_connections: databaseMaxConnectionsValue,
        opened_connections: databaseOpenedConnections,
      },
    },
  });
}

export default status;
