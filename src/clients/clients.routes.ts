import { Router } from 'express';
import { ClientLogin, ClientRegister, RetrievedDocuments, UpdateDocuments, ViewGeneralNews, ViewIndividualClientsNews } from './clients.controller';


const clientsRouter = Router();
clientsRouter.get('/ViewGeneralNews',ViewGeneralNews); // X
clientsRouter.post('/ClientRegister',ClientRegister); // V
clientsRouter.post('/ClientLogin',ClientLogin); // V
clientsRouter.get('/ViewIndividualClientsNews',ViewIndividualClientsNews); // X
clientsRouter.get('/RetrievedDocuments',RetrievedDocuments); // X
clientsRouter.put('/UpdateDocuments',UpdateDocuments); // X
export default clientsRouter;