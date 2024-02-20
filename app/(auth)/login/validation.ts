import { object, string, boolean } from "yup";

export const schema = object({
  email: string().email().required(),
  password: string().required(),
}).required();
