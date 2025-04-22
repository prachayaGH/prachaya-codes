import * as pg from "pg";

const { Pool } = pg.default;

const connectionPool = new Pool({
    connectionString: "postgresql://postgres:postgres@localhost:5432/prachaya_blog"
})

export default connectionPool;