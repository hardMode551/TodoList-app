import React from "react";
import { Task } from "../types/Task";
import { Card, CardContent, Typography, Button } from "@mui/material";

import "../styles/TaskList.css";

interface TaskListProps {
  tasks: Task[];
  updateTask: (updatedTask: Task) => void;
  deleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  updateTask,
  deleteTask,
}) => {

  if (tasks.length === 0) {
    return (
      <div className="grid">
        <Typography variant="h6" className="typography mb-2">
          Нет таких задач
        </Typography>
      </div>
    );
  }

  return (
    <div className="grid">
      {tasks.map((task) => (
        <Card key={task.id} className="card">
          <CardContent className="card-content">
            <Typography variant="h5" className="typography mb-2">
              {task.title}
            </Typography>
            <Typography variant="body2" className="mb-2">
              {task.description}
            </Typography>
            <Typography variant="body2" className="mb-2">
              {task.dueDate === "" ? "" : `Срок выполнения: ${task.dueDate}`}
            </Typography>
            <Typography variant="body2" className="mb-4">
              Статус:{" "}
              <span
                className={
                  task.status === "completed"
                    ? "status-completed"
                    : "status-not-completed"
                }
              >
                {task.status === "completed" ? "Выполнено" : "Не выполнено"}
              </span>
            </Typography>
            <Button
              variant="contained"
              color={task.status === "completed" ? "error" : "success"}
              onClick={() =>
                updateTask({
                  ...task,
                  status: task.status === "completed" ? "pending" : "completed",
                })
              }
              className="button button-primary mr-2"
            >
              {task.status === "completed" ? "Не завершено" : "Завершено"}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => deleteTask(task.id)}
              className="button button-secondary"
            >
              Удалить
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TaskList;
