// Type definitions for the application
export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  userId: number;
}

// API response type from JSONPlaceholder
export interface TodoResponse {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}