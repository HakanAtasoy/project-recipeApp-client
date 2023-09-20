import { User } from "../user/user.model";

export interface SignupResponse {
  success: boolean;
  token: string;
  message?: string;
  user: User; // Use the User type
}