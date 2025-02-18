import userController from "../controllers/user.controller";
import express from 'express';
const router = express.Router(); 
import Authorization from "../middlewares/auth.middleware"

//retrieve all users data
router.get('/' ,Authorization.IsAdmin ,userController.getUsers); 

export default router ; 

