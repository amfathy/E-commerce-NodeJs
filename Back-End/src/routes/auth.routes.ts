import express from 'express' 
import auth from '../controllers/auth.controller'
import validateResource from '../middlewares/validate.middleware';
import {registerValidation , loginValidation} from '../validation/auth.validation'
const router = express.Router(); 

//validate user's info before register 
router.post('/registerAsUser', validateResource(registerValidation) , auth.RegisterAsUser); 

//register as Admin 
router.post('/registerAsAdmin', validateResource(registerValidation) , auth.RegisterAsAdmin); 


//validate user's info before login
router.post('/login' ,validateResource(loginValidation) ,auth.Login);

export default router; 
