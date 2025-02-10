import { IUser, UserRole, Address } from "../interfaces/User";
import userSchema from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import hash from "../utils/hashPassword";
import * as dotenv from "dotenv";
import { registervalidation, Loginvalidation } from "../validation/auth.validation";

dotenv.config();

class AuthService {


  async UserRegistration(data: any) {
    try {
      const validation = registervalidation(data);
      if (!validation.success) {
        return {
          success: false,
          message: "Validation failed",
          errors: validation.error.errors,
        };
      }
      const { street, city, state, zip }: Address = data.address;
      const { name, email, password, address, phone }: IUser = data;
      const isExist = this.FindUserByEmail(email);
      if (!isExist) {
        return {
          success: false,
          message: "Email existed",
        };
      }
      const addressOfUser = await userSchema.address.create({
        street,
        city,
        state,
        zip,
      });
      const hashedPassword = await bcrypt.hash(password, 10);

      const userCreated = await userSchema.User.create({
        name,
        email,
        password: hashedPassword,
        address: addressOfUser._id,
        role: UserRole.User,
        phone,
      });

      if (!process.env.JWT_SECRET_KEY) {
        throw new Error("JWT_SECRET_KEY is not defined");
      }

      const token = jwt.sign(
        { userId: userCreated._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRE_TIME }
      );

      return {
        success: true,
        message: "User created successfully",
        Token: token,
      };
    } catch (err) {
      throw new Error(`Error of creation from service : ${err}`);
    }
  }

  async FindUserByEmail(Email: string) {
    try {
      const user = await userSchema.User.findOne({ email: Email });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async login(data : any)
  {
    const validation = Loginvalidation(data); 
    if(!validation.success){
        return {
            success: false,
            message: "Validation failed",
            errors: validation.error.errors,
          };
    } 
    const { email, password } = data;

    const user = await userSchema.User.findOne({ email });

    if (!user) {
      return{
        message: "Login failed, Email Not Founded",
      };
    }

    const authorized = await hash.isMatch(password, user!.password);

    if (!authorized) {
        return{
            message: "uncorrect password",
          };
    }

    if (!process.env.JWT_SECRET_KEY)
      throw new Error("JWT_SECRET_KEY is not defined");

    const Token = jwt.sign({ userId: user!._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE_TIME,
    });

    return {
        message: "successfully login",
        token  : Token 
    }
  } 
}

export default new AuthService();
