import { TaskForm } from '@/components/task-form';
import { getTask, getTasks } from '@/lib/api';
import type { Task } from '@/lib/api';

// Define the types for the page props (for dynamic routes)
interface EditTaskPageProps {
  params: { id: string };  // Expecting `id` as a string
}

// EditTaskPage component is a React Server Component
export default async function EditTaskPage({ params }: EditTaskPageProps) {
  const taskId = Number(params.id); // Convert the ID to a number
  const task = await getTask(taskId); // Fetch the task data

  if (!task) {
    return <div>Task not found</div>; // Handle case where the task is not found
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Task</h1>
      <TaskForm mode="edit" initialData={task} />
    </div>
  );
}

// Static generation for dynamic routes
export async function generateStaticParams() {
  const tasks = await getTasks(); // Fetch the list of tasks
  return tasks.map((task) => ({
    id: task.id.toString(), // Ensure that ID is a string
  }));
}
