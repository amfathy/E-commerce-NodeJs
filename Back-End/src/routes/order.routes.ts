import express from 'express';  
import { createOrder, getAllOrders, getOrder, deleteOrder, updateOrder } from '../controllers/order.controller';
import validateResource from '../middlewares/validate.middleware';
import { orderValidation } from '../validation/order.validation';
import Authorization from "../middlewares/auth.middleware";

const router = express.Router();

// Retrieve all orders 
router.get('/', Authorization.IsAdmin, getAllOrders);    

// Retrieve a single order by ID
router.get('/:id', Authorization.IsUser, getOrder);

// Create order but validate on user's info before it
router.post('/create', Authorization.IsUser, validateResource(orderValidation), createOrder);

// Update an order by ID
router.put('/:id', Authorization.IsUser, validateResource(orderValidation), updateOrder);

// Delete an order by ID
router.delete('/:id', Authorization.IsAdmin, deleteOrder);

export default router;
