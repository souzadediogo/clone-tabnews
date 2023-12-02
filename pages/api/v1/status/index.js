import database from "infra/database.js";
import query from "psql/lib/query";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const postgres_version = query.postgres_version;
  console.log(postgres_version);
  response.status(200).json({
    updated_at: updatedAt,
  });
}

export default status;
