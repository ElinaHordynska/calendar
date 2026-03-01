import { createPool } from "mysql2/promise"
import { config } from "dotenv"
config()

export default createPool({
    host: process.env.HOST,
    password: process.env.PASSWORD,
    user: process.env.USER,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10
})