import { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onComplete: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

const TaskItem = ({ task, onComplete, onDelete }: TaskItemProps) => {
  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1: return 'low-priority';
      case 2: return 'medium-priority';
      case 3: return 'high-priority';
      default: return '';
    }
  };

  return (
    <article className={`task-item ${getPriorityColor(task.priority)} ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <h3>{task.name}</h3>
        <p>Duration: {task.duration} minutes</p>
        {task.deadline && (
          <p>Deadline: {task.deadline.toLocaleDateString()}</p>
        )}
        <p>Priority: {task.priority}</p>
      </div>
      <div className="task-actions">
        <button
          onClick={() => onComplete(task.id)}
          disabled={task.completed}
        >
          {task.completed ? 'Completed' : 'Complete'}
        </button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </article>
  );
};

export default TaskItem; 