import { Db, MongoClient } from "mongodb";
import dotenv from "dotenv";

const ENV_FILE_MAP: Record<string, any> = {
    'DEV': '.env.local',
    'PROD': '.env'
};

const ENV = process.env['NODE_ENV'] || 'DEV';
const ENV_FILE = ENV_FILE_MAP[ENV]


dotenv.config({ path: ENV_FILE });

const DB_CONN_PREFIX = process.env['DB_CONN_PREFIX'];
const DB_USER = process.env['DB_USER'];
const DB_PWD = process.env['DB_PWD'];
const DB_NAME = process.env['DB_NAME'];
const DB_HOST = process.env['DB_HOST'];
const DB_CONN_PARAMS = process.env['DB_CONN_PARAMS'];
const APP_NAME = process.env['APP_NAME'];

const MONGO_URI = `${DB_CONN_PREFIX}${DB_USER}:${DB_PWD}@${DB_HOST}/${DB_CONN_PARAMS ? '?' + DB_CONN_PARAMS + '&appName=' + APP_NAME : '?appName=' + APP_NAME}`;

const mongoClient = new MongoClient(MONGO_URI);

export async function connect() {
    try {
        await mongoClient.connect();
        const db = mongoClient.db(DB_NAME);

        console.info(`Sucessfully conected with Mongo DB at database: ${DB_NAME}`);

        return db;
    } catch (error) {
        console.error(`Fail to connect to Mongo DB:`, error);
        process.exitCode = 1;
        throw error;
    }
}

export async function getCollection<T extends { [x: string]: any } = any>(db: Db, collectionName: string) {
    return db.collection<T>(collectionName);
}