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

//get all product info <<need enhancments>>
router.get('/' , productController.getProducts); 

//get product byId 
router.get('/:id' ,validateResource(validateId) ,productController.getProductById);

//change product details 
router.post('/editProduct' ,Authorization.IsAdmin ,productController.changeProductDetails);


export default router ; 


