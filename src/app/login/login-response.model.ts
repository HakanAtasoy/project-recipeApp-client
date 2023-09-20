import { User } from "../user/user.model";

export interface LoginResponse {
  success: boolean;
  token: string;
  message?: string;
  user: User; // Use the User type
}