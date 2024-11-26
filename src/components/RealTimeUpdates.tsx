import React, { useEffect } from "react";
import { socket } from "../services/socket";
import { Task } from "../types/Task";

const RealTimeUpdates: React.FC<{ tasks: Task[]; setTasks: React.Dispatch<React.SetStateAction<Task[]>> }> = ({
  setTasks,
}) => {
  useEffect(() => {
    socket.on("taskAdded", (newTask: Task) => {
      setTasks((prevTasks) => [...prevTasks, newTask]); // Используем коллбэк
    });

    socket.on("taskUpdated", (updatedTask: Task) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
    });

    socket.on("taskDeleted", (taskId: string) => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    });

    return () => {
      socket.off("taskAdded");
      socket.off("taskUpdated");
      socket.off("taskDeleted");
    };
  }, [setTasks]); // tasks больше не нужен в зависимостях, так как setTasks использует коллбэк

  return null; // Компонент не рендерит ничего, только управляет состоянием
};

export default RealTimeUpdates;
