import userController from "../controllers/user.controller";
import express from 'express';
const router = express.Router(); 

router.post('/create' , userController.createUser); 
router.get('/' , userController.getUsers); 

export default router ; 

