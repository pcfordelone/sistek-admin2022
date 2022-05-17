export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN" | "MASTER";
  created_at: Date;
  updated_at: Date;
}
