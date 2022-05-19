export interface UdpateEmployeeRequest {
  name: string;
  email: string;
  isActive?: boolean;
  birthday?: Date;
  vacation?: Date;
  phone?: string;
  position?: string;
  avatar_url?: string;
  address?: string;
  a_complement?: string;
  a_cep?: string;
  a_city?: string;
  a_state?: string;
  user_id: string;
}
