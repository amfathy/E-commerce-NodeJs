 import { Document } from "mongoose";
 enum IUserRole {
    Admin = 'admin',
    User = 'user',
}

 type IAddress = {
    street:String;
    city:String;
    state:String;
    zip:String;
}

 interface IUser extends Document {
    name:string;
    email:string;
    password:string;
    role : IUserRole;
    address:IAddress;
    phone:string;
    created_at:Date;
    updated_at:Date;

}
export type{ IAddress , IUser}; 
export {IUserRole};
 




