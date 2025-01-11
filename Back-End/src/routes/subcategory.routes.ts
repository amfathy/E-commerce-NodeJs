import subcategory from "../controllers/subcategory";
import express from 'express'; 
const router = express.Router();

router.post('/create' , subcategory.createSubcategory); 
router.get('/' , subcategory.getSubcategories ); 
export default router ; 
