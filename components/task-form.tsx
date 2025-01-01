'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Task } from '@/lib/api';
import { useTaskContext } from '@/context/task-context';

interface TaskFormProps {
  initialData?: Task;
  mode: 'add' | 'edit';
}

export function TaskForm({ initialData, mode }: TaskFormProps) {
  const router = useRouter();
  const { addTask, updateTaskStatus } = useTaskContext();

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    completed: initialData?.completed || false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'add') {
      await addTask({
        ...formData,
        userId: 1, // Default user ID for demo
      });
    } else if (initialData) {
      await updateTaskStatus({
        ...initialData,
        ...formData,
      });
    }
    
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{mode === 'add' ? 'Add New Task' : 'Edit Task'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter task title"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter task description"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => router.push('/')}>
            Cancel
          </Button>
          <Button type="submit">
            {mode === 'add' ? 'Add Task' : 'Save Changes'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}