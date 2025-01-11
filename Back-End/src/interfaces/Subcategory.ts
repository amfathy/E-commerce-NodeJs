import { Types } from 'mongoose';

interface ISubcategory {
name : string;
category_id : Types.ObjectId;
created_at : Date;
updated_at : Date;
}

export default ISubcategory;    



