import React, { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskList from "../components/TaskList";
import TaskCanvas from "../components/TaskCanvas";
import TaskForm from "../components/TaskForm";
import TaskFilter from "../components/TaskFilter";

const HomePage: React.FC = () => {
  const taskContext = useContext(TaskContext);
  const [filterStatus, setFilterStatus] = useState('all');

  if (!taskContext) {
    return <p>Loading...</p>; // Если контекст еще не доступен
  }

  const { tasks, addTask, updateTask, deleteTask } = taskContext;

  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'completed') return task.status === 'completed';
    if (filterStatus === 'not_completed') return task.status !== 'completed';
    return true;
  });

  const handleFilterChange = (newFilterStatus: string) => {
    setFilterStatus(newFilterStatus);
  };

  return (
    <div>
      <TaskFilter onFilterChange={handleFilterChange} />
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        {/* Список задач */}
        <TaskList tasks={filteredTasks} updateTask={updateTask} deleteTask={deleteTask} />

        {/* Визуализация задач на Canvas */}
        <TaskCanvas tasks={filteredTasks} updateTask={updateTask}/>
      </div>

      {/* Форма добавления задач */}
      <TaskForm addTask={addTask} />
    </div>
  );
};

export default HomePage;