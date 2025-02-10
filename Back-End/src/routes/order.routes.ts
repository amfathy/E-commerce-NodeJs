import express from 'express';  
import orderController from '../controllers/order.controller';
// import Auth from '../controllers/auth.controller'
const router = express.Router();

router.get('/', orderController.getOrders);    
router.post('/create', orderController.createOrder);

export default router ; 