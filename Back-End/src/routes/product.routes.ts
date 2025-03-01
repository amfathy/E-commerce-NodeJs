import express from 'express'
import productController from '../controllers/product.controller';
import upload from '../middlewares/upload';
import validateResource from '../middlewares/validate.middleware';
import { productValidation } from '../validation/product.validation';
import { validateId } from '../validation/objectIdValidation';
import Authorization from "../middlewares/auth.middleware"
const router = express.Router(); 

//create product by Admin
router.post('/create' ,Authorization.IsAdmin, upload.array('images' , 5 ) ,validateResource(productValidation) , productController.createProduct); 

//get all product info 
router.get('/' , productController.getAllProduct); 

//get product byId 
router.get('/:id' ,validateResource(validateId) ,productController.getProduct);

//change product details 
router.post('/editProduct' ,Authorization.IsAdmin ,productController.updateProduct);

//delete specific product by id   //need to affect multer !!! 
//router.delete('/delete' , Authorization.IsAdmin , productController.deleteProduct); 

export default router ; 


