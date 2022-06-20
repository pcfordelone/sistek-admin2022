export interface ICreateAdminUserRequest {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  role: "ADMIN";
  isActive: boolean;
}
