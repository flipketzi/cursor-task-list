import { useState } from 'react';
import { Task, Priority } from '../types/Task';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onTaskComplete: (taskId: string) => void;
  onTaskDelete: (taskId: string) => void;
}

const TaskList = ({ tasks, onTaskComplete, onTaskDelete }: TaskListProps) => {
  const [sortBy, setSortBy] = useState<'priority' | 'deadline'>('priority');

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortBy === 'priority') {
      return b.priority - a.priority;
    } else {
      if (!a.deadline && !b.deadline) return 0;
      if (!a.deadline) return 1;
      if (!b.deadline) return -1;
      return a.deadline.getTime() - b.deadline.getTime();
    }
  });

  return (
    <div className="task-list">
      <div className="sort-controls">
        <label>
          Sort by:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as 'priority' | 'deadline')}>
            <option value="priority">Priority</option>
            <option value="deadline">Deadline</option>
          </select>
        </label>
      </div>
      {sortedTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onComplete={onTaskComplete}
          onDelete={onTaskDelete}
        />
      ))}
    </div>
  );
};

export default TaskList; 