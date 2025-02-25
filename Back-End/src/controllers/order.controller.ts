import { createEntity , getEntity , getAllEntities ,updateEntity,deleteEntity } from "./Crud.factory.controller";
import {Order} from "../models/order.model";

export const createOrder = createEntity(Order);
export const getOrder = getEntity(Order);
export const getAllOrders = getAllEntities(Order);
export const updateOrder = updateEntity(Order);
export const deleteOrder = deleteEntity(Order);


