import { IEmployee } from "./IEmployee";
import { randomUUID } from "crypto";

export class EmployeeEntity {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  birthday?: Date;
  vacation?: Date;
  since?: Date;
  rg?: string;
  cpf?: string;
  phone?: string;
  position?: string;
  avatar_url?: string;
  address?: string;
  a_complement?: string;
  a_cep?: string;
  a_city?: string;
  a_state?: string;
  created_at?: Date;
  updated_at?: Date;
  user_id: string;

  constructor(
    props: Omit<IEmployee, "id" | "created_at" | "updated_at">,
    id?: string
  ) {
    Object.assign(this, props);

    if (!id) {
      this.id = randomUUID();
    }
  }
}
