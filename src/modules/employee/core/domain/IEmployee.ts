export interface IEmployee {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
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
  created_at?: Date;
  updated_at?: Date;
  user_id: string;
}
