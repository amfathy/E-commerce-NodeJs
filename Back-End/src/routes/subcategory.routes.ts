import subcategory from "../controllers/subcategory.controller";
import express from 'express'; 
import validateResource from "../middlewares/validate.middleware";
import {subcategoryValidation} from "../validation/subcategory.validation"
import Authorization from "../middlewares/auth.middleware";

const router = express.Router();

//validate resource and create one 
router.post('/create' ,Authorization.IsAdmin,validateResource(subcategoryValidation), subcategory.createSubcategory); 

//retrieve all data about subcategories
router.get('/' ,Authorization.IsAdmin, subcategory.getSubcategories ); 

export default router ; 
