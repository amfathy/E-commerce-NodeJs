import  express  from "express";
import categoryController from "../controllers/category.controller";
const router =  express.Router();


router.get('/', categoryController.getCategories);
router.post('/create', categoryController.createCategory);


export default router ; 