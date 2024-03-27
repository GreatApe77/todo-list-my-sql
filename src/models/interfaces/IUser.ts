export interface IUser {
  id: number;
  username: string;
  password: string;
  full_name?: string;
  created_at: Date;
  updated_at: Date;
}
