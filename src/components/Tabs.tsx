import { Task } from '../types/Task';

interface TabsProps {
  activeTab: 'active' | 'completed';
  onTabChange: (tab: 'active' | 'completed') => void;
  tasks: Task[];
}

const Tabs = ({ activeTab, onTabChange, tasks }: TabsProps) => {
  const activeTasksCount = tasks.filter(task => !task.completed).length;
  const completedTasksCount = tasks.filter(task => task.completed).length;

  return (
    <div className="tabs" data-testid="tabs">
      <button
        className={`tab ${activeTab === 'active' ? 'active' : ''}`}
        onClick={() => onTabChange('active')}
        data-testid="active-tab"
      >
        Active ({activeTasksCount})
      </button>
      <button
        className={`tab ${activeTab === 'completed' ? 'active' : ''}`}
        onClick={() => onTabChange('completed')}
        data-testid="completed-tab"
      >
        Completed ({completedTasksCount})
      </button>
    </div>
  );
};

export default Tabs; 