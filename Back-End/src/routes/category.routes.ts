import  express  from "express";
import categoryController from "../controllers/category.controller";
import validateResource from "../middlewares/validate.middleware";
import {categoryValidation} from "../validation/category.validation"
const router =  express.Router();

//For retrieving all categories in the store 
router.get('/', categoryController.getCategories);

//For create cateogry after validation on admin's input
router.post('/create',validateResource(categoryValidation) ,categoryController.createCategory);



export default router ; 