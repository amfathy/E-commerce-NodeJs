 enum UserRole {
    Admin = 'admin',
    User = 'user',
}

 type Address = {
    street:String;
    city:String;
    state:String;
    zip:String;
}

 interface IUser {
    name:string;
    email:string;
    password:string;
    role : UserRole;
    address:Address;
    phone:string;
    created_at:Date;
    updated_at:Date;

}
export type{ Address , IUser}; 
export {UserRole};
 




