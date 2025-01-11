import { Types } from "mongoose";
import ICategory from "./Category";
import ISubcategory from "./Subcategory";

interface IProduct {
    name:string;
    description:string;
    price:number;
    category_id:Types.ObjectId | ICategory ;
    subcategory_id:Types.ObjectId | ISubcategory;
    isStock:boolean;
    images:Array<string>;
    quantity:number; 
    created_at:Date;
    updated_at:Date;
}

export default IProduct;

