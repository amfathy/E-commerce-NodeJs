import { createEntity , getEntity , getAllEntities ,updateEntity,deleteEntity } from "./Crud.factory.controller";
import {Subcategory} from "../models/subcategory.model";

export const createSubcategory = createEntity(Subcategory);
export const getSubcategory = getEntity(Subcategory);
export const getAllSubcategories = getAllEntities(Subcategory);
export const updateSubcategory = updateEntity(Subcategory);
export const deleteSubcategory = deleteEntity(Subcategory);


