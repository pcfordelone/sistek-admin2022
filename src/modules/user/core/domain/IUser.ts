export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  role: "MASTER" | "ADMIN" | "USER";
  created_at: Date;
  updated_at: Date;
}
