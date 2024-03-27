export interface ITodo {
  id: number;
  content: string;
  done: boolean;
  created_at: Date;
  updated_at: Date;
  checklist_id: number;
}
