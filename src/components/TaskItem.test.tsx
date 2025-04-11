import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskItem from './TaskItem';
import { Task } from '../types/Task';

describe('TaskItem', () => {
  const mockTask: Task = {
    id: '1',
    name: 'Test Task',
    duration: 30,
    priority: 2,
    completed: false,
    createdAt: new Date(),
  };

  it('renders task information correctly', () => {
    render(
      <TaskItem
        task={mockTask}
        onComplete={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Duration: 30 minutes')).toBeInTheDocument();
    expect(screen.getByText('Priority: 2')).toBeInTheDocument();
  });

  it('renders deadline when provided', () => {
    const taskWithDeadline: Task = {
      ...mockTask,
      deadline: new Date('2024-03-25'),
    };

    render(
      <TaskItem
        task={taskWithDeadline}
        onComplete={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByText(/Deadline:/i)).toBeInTheDocument();
  });

  it('applies correct priority class', () => {
    const { rerender } = render(
      <TaskItem
        task={{ ...mockTask, priority: 1 }}
        onComplete={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByRole('article')).toHaveClass('low-priority');

    rerender(
      <TaskItem
        task={{ ...mockTask, priority: 3 }}
        onComplete={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByRole('article')).toHaveClass('high-priority');
  });

  it('disables complete button when task is completed', () => {
    render(
      <TaskItem
        task={{ ...mockTask, completed: true }}
        onComplete={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByText('Completed')).toBeDisabled();
  });

  it('calls onComplete when complete button is clicked', () => {
    const onComplete = vi.fn();
    render(
      <TaskItem
        task={mockTask}
        onComplete={onComplete}
        onDelete={vi.fn()}
      />
    );

    fireEvent.click(screen.getByText('Complete'));
    expect(onComplete).toHaveBeenCalledWith('1');
  });

  it('calls onDelete when delete button is clicked', () => {
    const onDelete = vi.fn();
    render(
      <TaskItem
        task={mockTask}
        onComplete={vi.fn()}
        onDelete={onDelete}
      />
    );

    fireEvent.click(screen.getByText('Delete'));
    expect(onDelete).toHaveBeenCalledWith('1');
  });
}); 