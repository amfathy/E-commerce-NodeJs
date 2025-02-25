import { IAddress, IUser, IUserRole } from "../interfaces/User";
import {User , Address} from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import hash from "../utils/hashPassword";
import * as dotenv from "dotenv";

dotenv.config();

class AuthService {


  async registration(data: any , role :IUserRole ) {
    try {
      const { street, city, state, zip }: IAddress = data.address;
      const { name, email, password, address, phone }: IUser = data;
      const isExist = this.FindUserByEmail(email);
      if (!isExist) {
        return {
          success: false,
          message: "Email existed",
        };
      }
      const addressOfUser = await Address.create({
        street,
        city,
        state,
        zip,
      });
      const hashedPassword = await bcrypt.hash(password, 10);

      const userCreated = await User.create({
        name,
        email,
        password: hashedPassword,
        address: addressOfUser._id,
        role: role,
        phone,
      });

      if (!process.env.JWT_SECRET_KEY) {
        throw new Error("JWT_SECRET_KEY is not defined");
      }

      const token = jwt.sign(
        { userId: userCreated._id  , role: userCreated.role },
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
      const user = await User.findOne({ email: Email });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async login(data : any)
  {
    const { email, password } = data;

    const user = await User.findOne({ email });

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

    const Token = jwt.sign({ userId: user!._id ,  role: user!.role }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE_TIME,
    });

    return {
        message: "successfully login",
        token  : Token 
    }
  } 
}

export default new AuthService();
