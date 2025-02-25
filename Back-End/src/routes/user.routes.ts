import express from 'express';
import { getAllUsers, getUser, updateUser, deleteUser, createUser } from "../controllers/user.controller";
import Authorization from "../middlewares/auth.middleware";
import validateResource from "../middlewares/validate.middleware";
import { validateId } from "../validation/objectIdValidation";

const router = express.Router();

// Retrieve all users data
router.get('/', Authorization.IsAdmin, getAllUsers);

// Retrieve specific user info
router.get('/:id', Authorization.IsAdmin, validateResource(validateId), getUser);

// Create a new user
router.post('/', Authorization.IsAdmin, createUser);

// Update a user
router.put('/:id', Authorization.IsAdmin, validateResource(validateId), updateUser);

// Delete a user
router.delete('/:id', Authorization.IsAdmin, validateResource(validateId), deleteUser);

export default router;
