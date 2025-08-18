import connectDB from './infra/database/mongo_impl/mongooose.connection';
import app from './server';
import dotenv from 'dotenv';

const ENV: 'PROD' | 'DEV' = process.env['NODE_ENV'] as 'PROD' | 'DEV' || 'DEV';

switch (ENV) {
    case 'DEV':
        dotenv.config({ path: '.env.local' });        
        break;

    default:
        dotenv.config();
        break;
}

const PORT = parseInt(process.env['SERVER_PORT'] || '8888', 10);

connectDB().then(() =>{
    app.listen(PORT, () => {
        console.info(`✅ Server is up an running on PORT: ${PORT}`);
        if (ENV === 'DEV')
            console.info(`🔗 Acess the backend page at: http://localhost:${PORT}`);
    })
});

