import { createSubcategory, deleteSubcategory, updateSubcategory, getAllSubcategories, getSubcategory } from "../controllers/subcategory.controller";
import express from 'express';
import validateResource from "../middlewares/validate.middleware";
import { subcategoryValidation } from "../validation/subcategory.validation";
import Authorization from "../middlewares/auth.middleware";

const router = express.Router();

// Validate resource and create one
router.post('/create', Authorization.IsAdmin, validateResource(subcategoryValidation), createSubcategory);

// Retrieve all data about subcategories
router.get('/', Authorization.IsAdmin, getAllSubcategories);

// Retrieve a single subcategory by ID
router.get('/:id', Authorization.IsAdmin, getSubcategory);

// Update a subcategory by ID
router.put('/:id', Authorization.IsAdmin, validateResource(subcategoryValidation), updateSubcategory);

// Delete a subcategory by ID
router.delete('/:id', Authorization.IsAdmin, deleteSubcategory);

export default router;
