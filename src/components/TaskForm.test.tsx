import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from './TaskForm';

describe('TaskForm', () => {
  it('renders all form fields', () => {
    render(<TaskForm onSubmit={vi.fn()} />);
    
    expect(screen.getByLabelText(/Task Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Duration/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Deadline/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Priority/i)).toBeInTheDocument();
  });

  it('submits form with correct data', () => {
    const onSubmit = vi.fn();
    render(<TaskForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText(/Task Name/i), {
      target: { value: 'Test Task' },
    });
    fireEvent.change(screen.getByLabelText(/Duration/i), {
      target: { value: '30' },
    });
    fireEvent.change(screen.getByLabelText(/Deadline/i), {
      target: { value: '2024-03-20T12:00' },
    });
    fireEvent.change(screen.getByLabelText(/Priority/i), {
      target: { value: '3' },
    });

    fireEvent.submit(screen.getByRole('form'));

    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Test Task',
      duration: 30,
      deadline: expect.any(Date),
      priority: 3,
    });
  });

  it('resets form after submission', async () => {
    const onSubmit = vi.fn();
    const { container } = render(<TaskForm onSubmit={onSubmit} />);

    // Fill out the form
    const nameInput = screen.getByLabelText(/Task Name/i);
    const durationInput = screen.getByLabelText(/Duration/i);
    const prioritySelect = screen.getByLabelText(/Priority/i);

    fireEvent.change(nameInput, { target: { value: 'Test Task' } });
    fireEvent.change(durationInput, { target: { value: '30' } });
    fireEvent.change(prioritySelect, { target: { value: '3' } });

    // Submit the form
    fireEvent.submit(screen.getByRole('form'));

    // Check if onSubmit was called with the correct data
    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Test Task',
      duration: 30,
      deadline: undefined,
      priority: 3,
    });

    // Check if form inputs are empty
    const form = container.querySelector('form');
    expect(form?.querySelector('#name')).toHaveValue('');
    expect(form?.querySelector('#duration')).toHaveValue(null);
    expect(form?.querySelector('#priority')).toHaveValue('2');
  });

  it('validates required fields', () => {
    const onSubmit = vi.fn();
    render(<TaskForm onSubmit={onSubmit} />);

    // Try to submit with empty fields
    fireEvent.submit(screen.getByRole('form'));
    expect(onSubmit).not.toHaveBeenCalled();

    // Fill only name
    fireEvent.change(screen.getByLabelText(/Task Name/i), {
      target: { value: 'Test Task' },
    });
    fireEvent.submit(screen.getByRole('form'));
    expect(onSubmit).not.toHaveBeenCalled();

    // Fill invalid duration
    fireEvent.change(screen.getByLabelText(/Duration/i), {
      target: { value: 'invalid' },
    });
    fireEvent.submit(screen.getByRole('form'));
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('handles form submission without deadline', () => {
    const onSubmit = vi.fn();
    render(<TaskForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText(/Task Name/i), {
      target: { value: 'Test Task' },
    });
    fireEvent.change(screen.getByLabelText(/Duration/i), {
      target: { value: '30' },
    });
    fireEvent.change(screen.getByLabelText(/Priority/i), {
      target: { value: '1' },
    });

    fireEvent.submit(screen.getByRole('form'));

    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Test Task',
      duration: 30,
      deadline: undefined,
      priority: 1,
    });
  });
}); 