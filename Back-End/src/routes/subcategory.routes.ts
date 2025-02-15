import subcategory from "../controllers/subcategory.controller";
import express from 'express'; 
import validateResource from "../middlewares/validate.middleware";
import {subcategoryValidation} from "../validation/subcategory.validation"

const router = express.Router();

//validate resource and create one 
router.post('/create' ,validateResource(subcategoryValidation), subcategory.createSubcategory); 

//retrieve all data about subcategories
router.get('/' , subcategory.getSubcategories ); 

export default router ; 
