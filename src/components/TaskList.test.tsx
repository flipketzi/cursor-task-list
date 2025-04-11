import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from './TaskList';
import { Task } from '../types/Task';

describe('TaskList', () => {
  const mockTasks: Task[] = [
    {
      id: '1',
      name: 'High Priority Task',
      duration: 30,
      priority: 3,
      completed: false,
      createdAt: new Date(),
    },
    {
      id: '2',
      name: 'Low Priority Task',
      duration: 45,
      priority: 1,
      completed: false,
      createdAt: new Date(),
    },
    {
      id: '3',
      name: 'Task with Deadline',
      duration: 60,
      priority: 2,
      deadline: new Date('2024-03-25'),
      completed: false,
      createdAt: new Date(),
    },
  ];

  it('renders tasks sorted by priority by default', () => {
    render(
      <TaskList
        tasks={mockTasks}
        onTaskComplete={vi.fn()}
        onTaskDelete={vi.fn()}
      />
    );

    const taskNames = screen.getAllByRole('heading', { level: 3 });
    expect(taskNames[0]).toHaveTextContent('High Priority Task');
    expect(taskNames[1]).toHaveTextContent('Task with Deadline');
    expect(taskNames[2]).toHaveTextContent('Low Priority Task');
  });

  it('sorts tasks by deadline when selected', () => {
    render(
      <TaskList
        tasks={mockTasks}
        onTaskComplete={vi.fn()}
        onTaskDelete={vi.fn()}
      />
    );

    fireEvent.change(screen.getByLabelText(/Sort by/i), {
      target: { value: 'deadline' },
    });

    const taskNames = screen.getAllByRole('heading', { level: 3 });
    expect(taskNames[0]).toHaveTextContent('Task with Deadline');
  });

  it('calls onTaskComplete when complete button is clicked', () => {
    const onTaskComplete = vi.fn();
    render(
      <TaskList
        tasks={mockTasks}
        onTaskComplete={onTaskComplete}
        onTaskDelete={vi.fn()}
      />
    );

    fireEvent.click(screen.getAllByText('Complete')[0]);
    expect(onTaskComplete).toHaveBeenCalledWith('1');
  });

  it('calls onTaskDelete when delete button is clicked', () => {
    const onTaskDelete = vi.fn();
    render(
      <TaskList
        tasks={mockTasks}
        onTaskComplete={vi.fn()}
        onTaskDelete={onTaskDelete}
      />
    );

    fireEvent.click(screen.getAllByText('Delete')[0]);
    expect(onTaskDelete).toHaveBeenCalledWith('1');
  });
}); 