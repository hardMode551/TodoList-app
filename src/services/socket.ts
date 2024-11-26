import { io, Socket } from "socket.io-client";

// URL WebSocket-сервера
const SOCKET_URL = "http://localhost:3002";

// Создание и настройка инстанса WebSocket
export const socket: Socket = io(SOCKET_URL, {
  reconnection: true, // Автоматическое переподключение
  reconnectionAttempts: 5, // Количество попыток переподключения
  reconnectionDelay: 1000, // Задержка между попытками переподключения
  transports: ["websocket"], // Использовать только WebSocket-протокол
});

// Обработчик ошибок (опционально)
socket.on("connect_error", (error) => {
  console.error("Ошибка подключения к WebSocket:", error);
});

socket.on("disconnect", (reason) => {
  console.warn("WebSocket отключен:", reason);
});
