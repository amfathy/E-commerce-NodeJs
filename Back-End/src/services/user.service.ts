import UserModel from "../models/user.model";
class UserService {
  async getUsers() {
    try {
      const users = await UserModel.User.find().populate("address");
      if (!users)
        return {
          message: "Schema Error",
          success: false,
          data : undefined
        };

      return {
        message: "Succussfully retrived",
        success: true,
        data : users 
      };
    } catch (err) {
      if (err instanceof Error)
        return {
          message: err.message,
          success: false,
          data : undefined
        };
      else
        return {
          message: "Schema unexcptioanal Error",
          success: false,
          data : undefined
        };
    }
  }
}

export default new UserService