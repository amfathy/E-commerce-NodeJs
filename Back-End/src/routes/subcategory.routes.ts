import subcategory from "../controllers/subcategory.controller";
import express from 'express'; 
const router = express.Router();

router.post('/create' , subcategory.createSubcategory); 
router.get('/' , subcategory.getSubcategories ); 
export default router ; 
