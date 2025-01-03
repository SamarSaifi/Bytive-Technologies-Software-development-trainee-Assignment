# Interactive Todo List Manager

A modern, responsive todo list application built with Next.js 13, featuring real-time updates and a beautiful UI powered by shadcn/ui components.


## 🚀 Features

- **Modern UI/UX**
  - Responsive design that works on all devices
  - Beautiful animations and transitions
  - Toast notifications for user feedback
  - Light/dark mode support

- **Task Management**
  - Create, read, update, and delete tasks
  - Batch selection and deletion
  - Task status tracking
  - Real-time updates

- **Technical Features**
  - Server-side rendering with Next.js 13
  - Global state management using Context API
  - REST API integration with JSONPlaceholder
  - Type-safe development with TypeScript

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 13
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Icons**: Lucide React
- **Type Safety**: TypeScript
- **API Integration**: JSONPlaceholder


## 🏗️ Project Structure

```
├── app/                    # Next.js app directory
│   ├── page.tsx            # Home page
│   ├── add/                # Add task page
│   └── edit/[id]/          # Edit task page
├── components/             # React components
│   ├── Button.tsx          # Button component
│   ├── task-card.tsx       # Task card component
│   └── task-form.tsx       # Task form component
├── context/                # Global state management
│   └── task-context.tsx    # Context for task management
├── lib/                    # Utilities and configurations
│   ├── api.ts              # API functions
│   ├── config.ts           # Configuration
│   └── types.ts            # TypeScript types
├── __tests__/              # Test directory
│   ├── Button.test.tsx     # Unit tests for Button component
│   └── Task.test.tsx       # Unit tests for Task component
```

## 🔄 API Integration

The application integrates with JSONPlaceholder API:

- `GET /todos` - Fetch tasks
- `GET /todos/:id` - Fetch single task
- `POST /todos` - Create task
- `PUT /todos/:id` - Update task
- `DELETE /todos/:id` - Delete task


### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SamarSaifi/Bytive-Technologies-Software-development-trainee-Assignment.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Bytive-Technologies-Software-development-trainee-Assignment
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

 3. To run:
   ```bash
   npm run dev
   ```
   run on:   - Local:        http://localhost:3000
             - Network:      http://192.168.56.1:3000

## 🧪 Development

- **Run tests**
  ```bash
  npm run test
  ```

- **Build for production**
  ```bash
  npm run build
  ```

- **Start production server**
  ```bash
  npm start
  ```

- **Start development server**
   ```bash
   npm run dev
   ```
   run on:   - Local:        http://localhost:3000
             - Network:      http://192.168.56.1:3000

## 📝 Usage Guidelines

1. **Adding Tasks**
   - Click "Add Task" button
   - Fill in task details
   - Submit the form

2. **Managing Tasks**
   - Check/uncheck to mark as complete
   - Click edit icon to modify
   - Use batch selection for multiple deletions

3. **Batch Operations**
   - Select multiple tasks using checkboxes
   - Use "Select All" for bulk selection
   - Delete selected tasks with "Delete Selected"

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/)#
