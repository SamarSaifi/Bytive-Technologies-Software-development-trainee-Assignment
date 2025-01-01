'use client';

import { Task } from '@/lib/api';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useTaskContext } from '@/context/task-context';
import { Pencil, Trash } from 'lucide-react';
import Link from 'next/link';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const { updateTaskStatus, removeTask, toggleTaskSelection, state } = useTaskContext();

  const isSelected = state.selectedTasks.includes(task.id);

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => toggleTaskSelection(task.id)}
            className="mt-1"
          />
          <div className="flex-1">
            <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
              {task.title}
            </h3>
            <p className="text-muted-foreground mt-1">{task.description}</p>
          </div>
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => updateTaskStatus({ ...task, completed: !task.completed })}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Link href={`/edit/${task.id}`}>
          <Button variant="outline" size="sm">
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </Link>
        <Button variant="destructive" size="sm" onClick={() => removeTask(task.id)}>
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}