import userController from "../controllers/user.controller";
import express from 'express';
const router = express.Router(); 
import Authorization from "../middlewares/auth.middleware"
import validateResource from "../middlewares/validate.middleware";
import {validateId} from "../validation/objectIdValidation"

//retrieve all users data
router.get('/' ,Authorization.IsAdmin ,userController.getUsers); 

//retrive specific userInfo 
router.get('/:id' , Authorization.IsAdmin,validateResource(validateId) ,userController.GetUserById); 

export default router ; 

