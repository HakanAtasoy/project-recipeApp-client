import { User } from "../user/user.model";

export interface LoginResponse {
  success: boolean;
  token: string;
  message?: string;
  userModel: User; // Use the User type
}