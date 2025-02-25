import express from "express";
import { getCategory, getAllCategories, createCategory, deleteCategory, updateCategory } from "../controllers/category.controller";
import validateResource from "../middlewares/validate.middleware";
import { categoryValidation } from "../validation/category.validation";
import Authorization from "../middlewares/auth.middleware";

const router = express.Router();

// For retrieving all categories in the store
router.get('/', Authorization.IsAdmin, getAllCategories);

// For retrieving a single category by ID
router.get('/:id', Authorization.IsAdmin, getCategory);

// For creating a category after validation on admin's input
router.post('/create', Authorization.IsAdmin, validateResource(categoryValidation), createCategory);

// For updating a category by ID after validation on admin's input
router.put('/update/:id', Authorization.IsAdmin, validateResource(categoryValidation), updateCategory);

// For deleting a category by ID
router.delete('/delete/:id', Authorization.IsAdmin, deleteCategory);

export default router;