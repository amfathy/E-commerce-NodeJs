import { createEntity , getEntity , getAllEntities ,updateEntity,deleteEntity } from "./Crud.factory.controller";
import {Category} from "../models/cateogry.model";

export const createCategory = createEntity(Category);
export const getCategory = getEntity(Category);
export const getAllCategories = getAllEntities(Category);
export const updateCategory = updateEntity(Category);
export const deleteCategory = deleteEntity(Category);
