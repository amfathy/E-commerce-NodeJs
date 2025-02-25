import { Document } from "mongoose";
interface ICategory extends Document {
name:string;
description:string;
created_at:Date;
updated_at:Date;
}

export default ICategory;

