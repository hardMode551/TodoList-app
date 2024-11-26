import React, { useState } from "react";
import { Task } from "../types/Task";
import { TextField, Button } from "@mui/material";

const TaskForm: React.FC<{ addTask: (task: Task) => void }> = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      dueDate,
      status: "pending",
    };
    addTask(newTask);
    setTitle("");
    setDescription("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 w-full max-w-md mx-auto bg-white rounded shadow-md">
      <div className="mb-4">
        <TextField
          label="Название"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}

          style={{ marginBottom: "10px" }}
        />
      </div>
      <div className="mb-4">
        <TextField
          label="Описание"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}

          style={{ marginBottom: "10px" }}
        />
      </div>
      <div className="mb-4">
        <TextField
          variant="outlined"
          fullWidth
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Добавить задачу
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;