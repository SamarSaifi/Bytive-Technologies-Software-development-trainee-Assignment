import { API_CONFIG } from './config';
import type { Task, TodoResponse } from './types';

// Convert TodoResponse to Task format
function mapTodoToTask(todo: TodoResponse): Task {
  return {
    ...todo,
    description: `Task description for ${todo.title}`, // Add description since JSONPlaceholder doesn't provide one
  };
}

// Error handler utility
async function handleResponse(response: Response) {
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

// Fetch all tasks
export async function getTasks(): Promise<Task[]> {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TODOS}`);
    const todos: TodoResponse[] = await handleResponse(response);
    return todos.slice(0, 10).map(mapTodoToTask); // Limit to 10 tasks for demo
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    throw error;
  }
}

// Fetch a single task
export async function getTask(id: number): Promise<Task> {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TODOS}/${id}`);
    const todo: TodoResponse = await handleResponse(response);
    return mapTodoToTask(todo);
  } catch (error) {
    console.error(`Failed to fetch task ${id}:`, error);
    throw error;
  }
}

// Create a new task
export async function createTask(task: Omit<Task, 'id'>): Promise<Task> {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TODOS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    const newTodo: TodoResponse = await handleResponse(response);
    return mapTodoToTask(newTodo);
  } catch (error) {
    console.error('Failed to create task:', error);
    throw error;
  }
}

// Update a task
export async function updateTask(task: Task): Promise<Task> {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TODOS}/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    const updatedTodo: TodoResponse = await handleResponse(response);
    return mapTodoToTask(updatedTodo);
  } catch (error) {
    console.error(`Failed to update task ${task.id}:`, error);
    throw error;
  }
}

// Delete a task
export async function deleteTask(id: number): Promise<void> {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TODOS}/${id}`, {
      method: 'DELETE',
    });
    await handleResponse(response);
  } catch (error) {
    console.error(`Failed to delete task ${id}:`, error);
    throw error;
  }
}

// Re-export the Task type
export type { Task };
