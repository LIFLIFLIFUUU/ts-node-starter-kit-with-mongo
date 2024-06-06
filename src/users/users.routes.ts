
/* Create Read Update Delete (CRUD) 

login (Read) --> method: POST [V]
register (Create) --> method: POST [V]
edit (Update) --> method: PUT [V]
delete (Delete) --> method: DELETE [V]

*/

//import 
import { Router } from 'express';
import { userLogin } from './users.controller';

//create the router object
const userRouter = Router();

//methods / routes -- Option 1
userRouter.post('/login', userLogin);
//userRouter.post('/register', register);
//userRouter.put('/edit', edit);
//userRouter.delete('/delete', deleteUser);

// Option 2
// userRouter
//   .post('/login', login)
//   .post('/register', register)
//   .put('/edit', edit)
//   .delete('/delete', deleteUser)

//export 
export default userRouter;

