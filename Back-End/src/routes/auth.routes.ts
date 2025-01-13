import express from 'express' 
import auth from '../controllers/auth.controller'
const router = express.Router(); 

router.post('/register', auth.RegisterAsUser); 
router.post('/login' , auth.LoginAsUser);

export default router; 
