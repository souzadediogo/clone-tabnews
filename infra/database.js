import { Client } from "pg";

const client = new Client({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD, //local_password"
});
async function query(queryObject) {
  await client.connect();

  const result = await client.query(queryObject);

  await client.end();

  return result;
}
async function getPostgresVersion() {
  await client.connect();
  const version = (await client.query("SELECT version()")).rows[0];

  await client.end();
  return version;
}

export default {
  query: query,
  getPostgresVersion: getPostgresVersion,
};
