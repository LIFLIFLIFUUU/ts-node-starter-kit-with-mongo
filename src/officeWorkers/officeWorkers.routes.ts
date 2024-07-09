

/* Create Read Update Delete (CRUD) 

login (Read) --> method: POST [V]
register (Create) --> method: POST [V]
edit (Update) --> method: PUT [V]
delete (Delete) --> method: DELETE [V]

*/

//import 
import { Router } from 'express';
import { GetTotalHoursPerClient, HoursRegistrationPerClient, OfficeWorkersLogin, SearchClientByID, UpdateHours, ViewClientDocuments } from './officeWorkers.controller';

//create the router object
const officeWorkersRouter = Router();

//methods / routes -- Option 1
officeWorkersRouter.post('/OfficeWorkersLogin', OfficeWorkersLogin); // V
// officeWorkersRouter.post('/OfficeWorkersregister', OfficeWorkersregister); // למנהל
officeWorkersRouter.post('/HoursRegistrationPerClient',HoursRegistrationPerClient ); // X
officeWorkersRouter.get('/ViewClientDocuments',ViewClientDocuments); // X

officeWorkersRouter.post('/register-hours', HoursRegistrationPerClient);
officeWorkersRouter.put('/update-hours', UpdateHours);
officeWorkersRouter.get('/total-hours/:worker_id/:client_id', GetTotalHoursPerClient);
officeWorkersRouter.get('/search-client/:client_id', SearchClientByID);
//userRouter.put('/edit', edit);
//userRouter.delete('/delete', deleteUser);

// Option 2
// userRouter
//   .post('/login', login)
//   .post('/register', register)
//   .put('/edit', edit)
//   .delete('/delete', deleteUser)

//export 
export default officeWorkersRouter;