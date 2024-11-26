import React, { useRef, useEffect, useState } from "react";
import { Task } from "../types/Task";
import * as fabric from "fabric";
import Modal from "react-modal";

import "../styles/TaskCanvas.css";

interface TaskCanvasProps {
  tasks: Task[];
  updateTask: (updatedTask: Task) => void;
}

const TaskCanvas: React.FC<TaskCanvasProps> = ({ tasks, updateTask }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Функция для изменения размера канваса
    const resizeCanvas = () => {
      if (containerRef.current && canvasRef.current) {
        // Получаем размеры контейнера
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;

        // Устанавливаем размер канваса
        setCanvasSize({
          width: containerWidth,
          height: containerHeight
        });

        if (fabricCanvasRef.current) {
          fabricCanvasRef.current.setWidth(containerWidth);
          fabricCanvasRef.current.setHeight(containerHeight);
          
          // Перерисовываем элементы с учетом нового размера
          fabricCanvasRef.current.renderAll();

          // Пересоздаем группы задач с новым позиционированием
          fabricCanvasRef.current.clear();
          tasks.forEach((task, index) => {
            const group = createTaskGroup(
              task, 
              index, 
              fabricCanvasRef.current!,
              containerWidth
            );
            fabricCanvasRef.current!.add(group);
          });
        }
      }
    };

    // Создаем ResizeObserver для отслеживания изменений размера
    const resizeObserver = new ResizeObserver(resizeCanvas);
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    if (canvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current, {
        selection: true,
      });

      fabricCanvasRef.current = canvas;

      // Первоначальная отрисовка задач
      tasks.forEach((task, index) => {
        const group = createTaskGroup(task, index, canvas, canvas.width);
        canvas.add(group);
      });
    }

    // Добавляем слушатель resize для окна
    window.addEventListener('resize', resizeCanvas);

    // Очистка
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', resizeCanvas);
      fabricCanvasRef.current?.dispose();
    };
  }, [tasks]);

  const createTaskGroup = (
    task: Task,
    index: number,
    _canvas: fabric.Canvas,
    canvasWidth: number
  ): fabric.Group => {
    const rect = new fabric.Rect({
      width: 250,
      height: 100,
      fill: task.status === "completed" ? "#00aa39" : "lightblue",
      rx: 10,
      ry: 10,
      stroke: "black",
      strokeWidth: 2,
    });
  
    const titleText = new fabric.Text(`Название: ${task.title}`, {
      fontFamily: "Montserrat",
      fontSize: 16,
      fill: "black",
      top: 10,
      left: 10,
    });
  
    const descText = new fabric.Text(`Описание: ${task.description}`, {
      fontFamily: "Montserrat",
      fontSize: 14,
      fill: "black",
      top: 35,
      left: 10,
    });
  
    const groupElements = [rect, titleText, descText];
  
    if (task.dueDate) {
      const dueDateText = new fabric.Text(`Срок выполнения: ${task.dueDate}`, {
        fontFamily: "Montserrat",
        fontSize: 14,
        fill: "black",
        top: 60,
        left: 10,
      });
      groupElements.push(dueDateText);
    }
  
    // Динамическое позиционирование с учетом ширины канваса
    const groupSpacing = 300;
    const leftPosition = Math.max(
      50, 
      Math.min(
        50 + index * groupSpacing, 
        canvasWidth - 300
      )
    );

    const group = new fabric.Group(groupElements, {
      left: leftPosition,
      top: 50,
      hasControls: true,
    });
  
    let lastClickTime = 0;
    group.on("mousedown", () => {
      const now = Date.now();
      if (now - lastClickTime < 300) {
        setSelectedTask(task);
        setModalOpen(true);
      }
      lastClickTime = now;
    });
  
    return group;
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedTask(null);
  };

  const handleTaskUpdate = () => {
    if (!selectedTask) return;
    updateTask(selectedTask);
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.renderAll();
    }
    handleModalClose();
  };

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%', 
        height: '600px', 
        position: 'relative' 
      }}
      className="relative"
    >
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0 
        }}
        className="canvas"
      />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        contentLabel="Редактировать задачу"
        ariaHideApp={false}
        className="modal"
        overlayClassName="overlay"
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Редактировать задачу</h2>
        {selectedTask && (
          <div className="form">
            <label>
              Название:
              <input
                type="text"
                value={selectedTask.title}
                onChange={(e) =>
                  setSelectedTask({ ...selectedTask, title: e.target.value })
                }
              />
            </label>
            <label>
              Описание:
              <textarea
                value={selectedTask.description}
                onChange={(e) =>
                  setSelectedTask({
                    ...selectedTask,
                    description: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Дата:
              <input
                type="date"
                value={selectedTask.dueDate}
                onChange={(e) =>
                  setSelectedTask({ ...selectedTask, dueDate: e.target.value })
                }
              />
            </label>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={handleTaskUpdate}>Сохранить</button>
              <button onClick={handleModalClose}>Отмена</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TaskCanvas;