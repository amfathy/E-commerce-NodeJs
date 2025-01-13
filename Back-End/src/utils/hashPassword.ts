import bcrypt from "bcrypt";

interface PasswordMatch {
  (password: string, savedPassword: string): Promise<boolean>;
}

const isMatch: PasswordMatch = async (password, savedPassword) => {
  return await bcrypt.compare(password, savedPassword);
};

export default { isMatch };
