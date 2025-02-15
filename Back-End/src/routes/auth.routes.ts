import express from 'express' 
import auth from '../controllers/auth.controller'
import validateResource from '../middlewares/validate.middleware';
import {registerValidation , loginValidation} from '../validation/auth.validation'
const router = express.Router(); 

//validate user's info before register 
router.post('/register', validateResource(registerValidation) , auth.RegisterAsUser); 

//validate user's info before login
router.post('/login' ,validateResource(loginValidation) ,auth.LoginAsUser);

export default router; 
