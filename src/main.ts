import { connect } from './database/mongo_impl/mongo.instance';
import createApp from './server';
import dotenv from 'dotenv';

const ENV_FILE_MAP: Record<string, any> = {
        'DEV': '.env.local',
        'PROD': '.env'
    };

    const ENV = process.env['NODE_ENV'] || 'DEV';
    const ENV_FILE = ENV_FILE_MAP[ENV]


    dotenv.config({ path: ENV_FILE });

async function start() {
    const PORT = parseInt(process.env['SERVER_PORT'] || '8888', 10);
    const db = await connect();
    const app = createApp(db)

    app.listen(PORT, () => {
        console.info(`✅ Server is up an running on PORT: ${PORT}`);
        console.info(`🔗 Acess the backend page at: https://localhost:${PORT}`);
    })

}

start();
