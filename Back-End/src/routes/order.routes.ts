import express from 'express';  
import orderController from '../controllers/order.controller';
import validateResource from '../middlewares/validate.middleware';
import {orderValidation} from '../validation/order.validation'
// import Auth from '../controllers/auth.controller'
const router = express.Router();

//retrive all orders 
router.get('/', orderController.getOrders);    

//create order but validate on user's info before it
router.post('/create',validateResource(orderValidation),orderController.createOrder);

export default router ; 