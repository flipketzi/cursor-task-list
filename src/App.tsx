import { useState, useEffect } from 'react'
import { Task } from './types/Task'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import MotivationalCompanion from './components/MotivationalCompanion'
import { mockTasks } from './data/mockTasks'
import './App.css'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [isFormHiding, setIsFormHiding] = useState(false)

  useEffect(() => {
    // Load mock tasks when the app starts
    setTasks(mockTasks);
  }, []);

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  const handleAddTask = (newTask: Omit<Task, 'id' | 'completed' | 'createdAt'>) => {
    const task: Task = {
      ...newTask,
      id: crypto.randomUUID(),
      completed: false,
      createdAt: new Date(),
    }
    setTasks([...tasks, task])
    setIsFormHiding(true)
    setTimeout(() => {
      setIsFormVisible(false)
      setIsFormHiding(false)
    }, 500) // Match the animation duration
  }

  const handleTaskComplete = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: true } : task
    ))
  }

  const handleTaskDelete = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  const toggleForm = () => {
    if (isFormVisible) {
      setIsFormHiding(true)
      setTimeout(() => {
        setIsFormVisible(false)
        setIsFormHiding(false)
      }, 500)
    } else {
      setIsFormVisible(true)
    }
  }

  return (
    <div className="app">
      <h1>Todo Tasklist</h1>
      <MotivationalCompanion 
        totalTasks={totalTasks}
        completedTasks={completedTasks}
      />
      {isFormVisible && (
        <TaskForm 
          onSubmit={handleAddTask} 
          className={isFormHiding ? 'hiding' : ''}
        />
      )}
      <TaskList
        tasks={tasks}
        onTaskComplete={handleTaskComplete}
        onTaskDelete={handleTaskDelete}
      />
      <button 
        className={`fab ${isFormVisible ? 'rotate' : ''} ${tasks.length === 0 ? 'pulse' : ''}`}
        onClick={toggleForm}
        aria-label={isFormVisible ? "Close form" : "Add task"}
      >
        {isFormVisible ? '×' : '+'}
      </button>
    </div>
  )
}

export default App
