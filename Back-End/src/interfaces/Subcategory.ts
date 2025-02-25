import { Types , Document } from 'mongoose';

interface ISubcategory extends Document{
name : string;
category_id : Types.ObjectId;
created_at : Date;
updated_at : Date;
}

export default ISubcategory;    



