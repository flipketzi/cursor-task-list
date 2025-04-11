export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  deadline?: Date;
  priority: Priority;
  completed: boolean;
  createdAt: Date;
} 