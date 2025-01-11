export  enum UserRole {
    Admin = 'admin',
    User = 'user',
    Guest = 'guest'
}

export  type Address = {
    street:String;
    city:String;
    state:String;
    zip:String;
}

export  interface IUser {
    name:string;
    email:string;
    password:string;
    role : UserRole;
    address:Address;
    phone:string;
    created_at:Date;
    updated_at:Date;

}




