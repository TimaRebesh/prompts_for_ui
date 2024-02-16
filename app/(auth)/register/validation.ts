import { object, string, number, date, InferType, boolean } from "yup";

export const schema = object({
  username: string().required(),
  email: string().email().required(),
  password: string().required(),
  confirmPassword: string().required(),
  admin: boolean().default(false),
}).required();
