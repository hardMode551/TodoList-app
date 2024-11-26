import { createContext } from "react";
import { Task } from "../types/Task";

export interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (updatedTask: Task) => void;
  deleteTask: (id: string) => void;
}

// Создаем контекст
export const TaskContext = createContext<TaskContextType | undefined>(undefined);
