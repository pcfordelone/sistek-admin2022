declare namespace Express {
  export interface Request {
    user_id: string;
    user_role: string;
    user_is_active: boolean;
  }
}
