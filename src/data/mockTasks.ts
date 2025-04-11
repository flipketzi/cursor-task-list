import { Task } from '../types/Task';

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete Project Documentation',
    description: 'Write comprehensive documentation for the todo app project',
    duration: 60,
    deadline: new Date('2024-04-15'),
    priority: 'high',
    completed: false,
    createdAt: new Date('2024-04-10')
  },
  {
    id: '2',
    title: 'Review Code Changes',
    description: 'Go through recent pull requests and review code changes',
    duration: 30,
    deadline: new Date('2024-04-12'),
    priority: 'medium',
    completed: false,
    createdAt: new Date('2024-04-10')
  },
  {
    id: '3',
    title: 'Plan Next Sprint',
    description: 'Create tasks and estimate time for the upcoming sprint',
    duration: 45,
    deadline: new Date('2024-04-14'),
    priority: 'low',
    completed: false,
    createdAt: new Date('2024-04-10')
  }
]; 