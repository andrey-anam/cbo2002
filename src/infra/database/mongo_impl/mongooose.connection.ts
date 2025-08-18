import dotenv from "dotenv";
import mongoose from "mongoose";

const ENV: 'PROD' | 'DEV' = process.env['NODE_ENV'] as 'PROD' | 'DEV' || 'DEV';

switch (ENV) {
    case 'DEV':
        dotenv.config({ path: '.env.local' });
        break;

    default:
        dotenv.config();
        break;
}

const DB_CONN_PREFIX = process.env['DB_CONN_PREFIX'];
const DB_USER = process.env['DB_USER'];
const DB_PWD = process.env['DB_PWD'];
const DB_NAME = process.env['DB_NAME'] || 'structure';
const DB_HOST = process.env['DB_HOST'];
const DB_CONN_PARAMS = process.env['DB_CONN_PARAMS'];
const APP_NAME = process.env['APP_NAME'] || 'cbo2002';

const MONGO_URI = `${DB_CONN_PREFIX}${DB_USER}:${DB_PWD}@${DB_HOST}/${DB_CONN_PARAMS ? '?' + DB_CONN_PARAMS + '&appName=' + APP_NAME : '?appName=' + APP_NAME}`;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            appName: APP_NAME,
            dbName: DB_NAME
        });
        console.info(`✅ Sucessfully conected with Mongo DB at database: ${DB_NAME}`);
    } catch (error) {
        console.error(`❌ Fail to connect to Mongo DB:`, error);
        throw error;
    }
}

export default connectDB