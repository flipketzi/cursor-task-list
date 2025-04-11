import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import MotivationalCompanion from '../MotivationalCompanion';

describe('MotivationalCompanion', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders without crashing', () => {
    render(<MotivationalCompanion totalTasks={0} completedTasks={0} />);
    expect(screen.getByTestId('companion-container')).toBeInTheDocument();
  });

  it('shows motivational quote when all tasks are completed', () => {
    render(<MotivationalCompanion totalTasks={5} completedTasks={5} />);
    expect(screen.getByTestId('motivational-quote')).toBeInTheDocument();
  });

  it('does not show quote when tasks are not completed', () => {
    render(<MotivationalCompanion totalTasks={5} completedTasks={3} />);
    expect(screen.queryByTestId('motivational-quote')).not.toBeInTheDocument();
  });

  it('does not show quote when there are no tasks', () => {
    render(<MotivationalCompanion totalTasks={0} completedTasks={0} />);
    expect(screen.queryByTestId('motivational-quote')).not.toBeInTheDocument();
  });

  it('updates quote when all tasks are completed', () => {
    const { rerender } = render(<MotivationalCompanion totalTasks={5} completedTasks={3} />);
    expect(screen.queryByTestId('motivational-quote')).not.toBeInTheDocument();

    rerender(<MotivationalCompanion totalTasks={5} completedTasks={5} />);
    expect(screen.getByTestId('motivational-quote')).toBeInTheDocument();
  });

  it('hides quote when tasks become incomplete', () => {
    const { rerender } = render(<MotivationalCompanion totalTasks={5} completedTasks={5} />);
    expect(screen.getByTestId('motivational-quote')).toBeInTheDocument();

    rerender(<MotivationalCompanion totalTasks={5} completedTasks={4} />);
    expect(screen.queryByTestId('motivational-quote')).not.toBeInTheDocument();
  });
}); 