import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD, //local_password"
  });
  await client.connect();

  const result = await client.query(queryObject);

  await client.end();
  console.log(`Client disconnected`);

  return result;
}

export default {
  query: query,
};
