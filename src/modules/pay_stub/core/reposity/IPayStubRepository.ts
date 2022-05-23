import { IPayStub } from "../domain/IPayStub";
export interface IPayStubRepository {
  createPayStub(
    data: Omit<IPayStub, "created_at" | "updated_at">
  ): Promise<IPayStub>;

  updatePayStub(
    id: string,
    data: Omit<IPayStub, "id" | "created_at" | "updated_at">
  ): Promise<IPayStub>;

  deletePayStub(id: string): Promise<IPayStub>;

  findPayStubById(id: string): Promise<IPayStub>;

  listPayStubs(
    year?: number,
    month?: number,
    order?: string,
    employee_id?: string
  ): Promise<IPayStub[]>;
}
