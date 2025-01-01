'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TaskCard } from '@/components/task-card';
import { useTaskContext } from '@/context/task-context';
import { Plus, Trash, CheckSquare, XSquare } from 'lucide-react';

export default function Home() {
  const {
    state,
    fetchTasks,
    removeTask,
    selectAllTasks,
    clearSelection,
  } = useTaskContext();

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleBatchDelete = async () => {
    for (const taskId of state.selectedTasks) {
      await removeTask(taskId);
    }
    clearSelection();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Tasks</h1>
        <Link href="/add">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </Link>
      </div>

      {state.selectedTasks.length > 0 && (
        <div className="bg-muted p-4 rounded-lg mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">
              {state.selectedTasks.length} tasks selected
            </span>
            <Button variant="outline" size="sm" onClick={selectAllTasks}>
              <CheckSquare className="h-4 w-4 mr-2" />
              Select All
            </Button>
            <Button variant="outline" size="sm" onClick={clearSelection}>
              <XSquare className="h-4 w-4 mr-2" />
              Clear Selection
            </Button>
          </div>
          <Button variant="destructive" size="sm" onClick={handleBatchDelete}>
            <Trash className="h-4 w-4 mr-2" />
            Delete Selected
          </Button>
        </div>
      )}

      {state.loading ? (
        <div className="text-center py-8">Loading tasks...</div>
      ) : state.error ? (
        <div className="text-center py-8 text-destructive">{state.error}</div>
      ) : state.tasks.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No tasks yet. Click the Add Task button to create one.
        </div>
      ) : (
        <div className="space-y-4">
          {state.tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}