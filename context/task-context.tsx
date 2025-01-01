'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Task, getTasks, createTask, updateTask, deleteTask } from '@/lib/api';
import { toast } from 'sonner';

// Define the state type
interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  selectedTasks: number[];
}

// Define action types
type TaskAction =
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'TOGGLE_TASK_SELECTION'; payload: number }
  | { type: 'SELECT_ALL_TASKS' }
  | { type: 'CLEAR_SELECTION' };

// Create context
const TaskContext = createContext<{
  state: TaskState;
  dispatch: React.Dispatch<TaskAction>;
  fetchTasks: () => Promise<void>;
  addTask: (task: Omit<Task, 'id'>) => Promise<void>;
  updateTaskStatus: (task: Task) => Promise<void>;
  removeTask: (id: number) => Promise<void>;
  toggleTaskSelection: (id: number) => void;
  selectAllTasks: () => void;
  clearSelection: () => void;
} | null>(null);

// Reducer function
function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case 'SET_TASKS':
      return { ...state, tasks: action.payload, loading: false };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'TOGGLE_TASK_SELECTION':
      return {
        ...state,
        selectedTasks: state.selectedTasks.includes(action.payload)
          ? state.selectedTasks.filter((id) => id !== action.payload)
          : [...state.selectedTasks, action.payload],
      };
    case 'SELECT_ALL_TASKS':
      return {
        ...state,
        selectedTasks: state.tasks.map((task) => task.id),
      };
    case 'CLEAR_SELECTION':
      return { ...state, selectedTasks: [] };
    default:
      return state;
  }
}

// Toast configuration
const TOAST_DURATION = 3000; // 3 seconds

// Provider component
export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, {
    tasks: [],
    loading: false,
    error: null,
    selectedTasks: [],
  });

  // Fetch tasks on mount
  const fetchTasks = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const tasks = await getTasks();
      dispatch({ type: 'SET_TASKS', payload: tasks });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch tasks' });
      toast.error('Failed to fetch tasks', { duration: TOAST_DURATION });
    }
  };

  // Add new task
  const addTask = async (task: Omit<Task, 'id'>) => {
    try {
      const newTask = await createTask(task);
      dispatch({ type: 'ADD_TASK', payload: newTask });
      toast.success('Task added successfully', { duration: TOAST_DURATION });
    } catch (error) {
      toast.error('Failed to add task', { duration: TOAST_DURATION });
    }
  };

  // Update task status
  const updateTaskStatus = async (task: Task) => {
    try {
      const updatedTask = await updateTask(task);
      dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
      toast.success('Task updated successfully', { duration: TOAST_DURATION });
    } catch (error) {
      toast.error('Failed to update task', { duration: TOAST_DURATION });
    }
  };

  // Delete task
  const removeTask = async (id: number) => {
    try {
      await deleteTask(id);
      dispatch({ type: 'DELETE_TASK', payload: id });
      toast.success('Task deleted successfully', { duration: TOAST_DURATION });
    } catch (error) {
      toast.error('Failed to delete task', { duration: TOAST_DURATION });
    }
  };

  // Toggle task selection
  const toggleTaskSelection = (id: number) => {
    dispatch({ type: 'TOGGLE_TASK_SELECTION', payload: id });
  };

  // Select all tasks
  const selectAllTasks = () => {
    dispatch({ type: 'SELECT_ALL_TASKS' });
  };

  // Clear selection
  const clearSelection = () => {
    dispatch({ type: 'CLEAR_SELECTION' });
  };

  return (
    <TaskContext.Provider
      value={{
        state,
        dispatch,
        fetchTasks,
        addTask,
        updateTaskStatus,
        removeTask,
        toggleTaskSelection,
        selectAllTasks,
        clearSelection,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

// Custom hook to use task context
export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}