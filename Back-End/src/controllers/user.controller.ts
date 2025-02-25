import { createEntity , getEntity , getAllEntities ,updateEntity,deleteEntity } from "./Crud.factory.controller";
import {User} from "../models/user.model";
export const createUser = createEntity(User);
export const getUser = getEntity(User);
export const getAllUsers = getAllEntities(User);
export const updateUser = updateEntity(User);
export const deleteUser = deleteEntity(User);
