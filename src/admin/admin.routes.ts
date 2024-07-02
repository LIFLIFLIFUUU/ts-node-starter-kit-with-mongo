

import { Router } from 'express';
import { AddNews, CreateMailingList, IndividualNews, NewClientsRegistration, OfficeWorkersRegistration, RetrieveMailingList, UpdateWorkersHours, ViewWorkersHours } from './admin.controller';

const adminRouter = Router();

adminRouter.post('/AddNews',AddNews); // X
adminRouter.post('/IndividualNews',IndividualNews); // X
adminRouter.post('/OfficeWorkersRegistration',OfficeWorkersRegistration); // V
adminRouter.post('/NewClientsRegistration',NewClientsRegistration); // X
adminRouter.get('/ViewWorkersHours',ViewWorkersHours); // X
adminRouter.put('/UpdateWorkersHours',UpdateWorkersHours); // X
adminRouter.post('/CreateMailingList',CreateMailingList); // X
adminRouter.get('/RetrieveMailingList',RetrieveMailingList); // X


export default adminRouter;