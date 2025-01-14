import express from 'express'
import productController from '../controllers/product.controller';
import upload from '../middlewares/upload';

const router = express.Router(); 

router.post('/create' , upload.array('images' , 5 ) , productController.createProduct); 
router.get('/' , productController.getProducts); 
router.get('/id' , productController.getProductById);
router.post('/editProduct' , productController.changeProductDetails);

export default router ; 