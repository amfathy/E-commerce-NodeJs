import validate from "./user.validation";


export const registervalidation = (body: unknown) => {
  return validate.userRegisterValidator.safeParse(body);
};

export const Loginvalidation = (body : any) => {
    return validate.userLoginValidator.safeParse(body);
}


