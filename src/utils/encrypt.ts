import { hash, compare } from "bcrypt";
const saltRounds = 12;

export const encryptPassword = async (password: string) => {
  return hash(password, saltRounds);
};

export const comparePassword = async (password: string, hash: string) => {
  return compare(password, hash);
};
