import { IPayStub } from "./IPayStub";
import { randomUUID } from "crypto";

export class PayStubEntity {
  id: string;
  date: Date;
  file_url: string;
  employee_id: string;
  notes?: string;
  created_at?: Date;
  updated_at?: Date;

  constructor(
    props: Omit<IPayStub, "id" | "created_at" | "updated_at">,
    id?: string
  ) {
    Object.assign(this, props);

    if (!id) {
      this.id = randomUUID();
    }
  }
}
