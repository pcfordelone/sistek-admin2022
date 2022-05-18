import { randomUUID } from "crypto";
import { IUser } from "./IUser";

export class UserEntity {
  id: string;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  role: "USER" | "ADMIN" | "MASTER";
  created_at: Date;
  updated_at: Date;

  constructor(
    props: Omit<IUser, "id" | "created_at" | "updated_at">,
    id?: string
  ) {
    Object.assign(this, props);

    if (!id) {
      this.id = randomUUID();
    }
  }
}
