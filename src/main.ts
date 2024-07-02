import express from 'express';
import 'dotenv/config';
import adminRouter from './admin/admin.routes';
import clientsRouter from './clients/clients.routes';
import officeWorkersRouter from './officeWorkers/officeWorkers.routes';

//config
//process.env.PORT --> the live server port
const PORT = process.env.PORT || 9876; 

//create the server
const server = express();

//config JSON support
server.use(express.json());

//using routes
server.use('/api/officeWorkers', officeWorkersRouter);
server.use('/api/admin', adminRouter);
server.use('/api/clients', clientsRouter);


//run the server
server.listen(PORT, () => console.log(`[Server] http://localhost:${PORT}`));