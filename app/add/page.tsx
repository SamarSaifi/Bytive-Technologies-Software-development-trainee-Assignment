'use client';

import { TaskForm } from '@/components/task-form';

export default function AddTaskPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Add New Task</h1>
      <TaskForm mode="add" />
    </div>
  );
}