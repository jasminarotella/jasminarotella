import React, { useEffect, useState } from "react";
import "./ToDoList.css"; // File CSS allegato in fondo
import CustomButton from "../../Home/components/Button";

interface Task {
  id: number;
  text: string;
  done: boolean;
}

function getCurrentDayKey() {
  // Restituisce la data nel formato "YYYY-MM-DD"
  const now = new Date();
  return now.toISOString().split("T")[0];
}

const ToDoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState("");
  
  // Per la funzionalità "modifica"
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  // ▶️ Al montaggio, carica i task dal localStorage se la data è la stessa
  //   Altrimenti, svuota tutto e imposta la data corrente
  useEffect(() => {
    const storedDay = localStorage.getItem("dayKey");
    const storedTasks = localStorage.getItem("tasks");
    const currentDay = getCurrentDayKey();

    if (storedDay === currentDay && storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      localStorage.setItem("dayKey", currentDay);
      localStorage.removeItem("tasks");
    }

    // ▶️ Ogni minuto, controlla se è cambiata la data
    const intervalId = setInterval(() => {
      const nowDay = getCurrentDayKey();
      const localDay = localStorage.getItem("dayKey");

      // Se la data è cambiata, resetta tutto
      if (nowDay !== localDay) {
        setTasks([]);
        localStorage.setItem("dayKey", nowDay);
        localStorage.removeItem("tasks");
      }
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  // ▶️ Salva i task in localStorage ogni volta che cambiano
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Aggiunge un nuovo task
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      text: inputValue.trim(),
      done: false,
    };
    setTasks((prev) => [...prev, newTask]);
    setInputValue("");
  };

  // Segna come fatto / non fatto
  const handleToggleDone = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  // Inizia la modifica di un task
  const handleEditTask = (id: number) => {
    const taskToEdit = tasks.find((t) => t.id === id);
    if (!taskToEdit) return;
    setEditingTaskId(id);
    setEditValue(taskToEdit.text);
  };

  // Salva la modifica
  const handleSaveTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: editValue } : t))
    );
    setEditingTaskId(null);
    setEditValue("");
  };

  return (
    <div className="todolist-container">
      <form className="form-style" onSubmit={handleAddTask}>
        <input
          className="input-text"
          type="text"
          value={inputValue}
          placeholder="Scrivi il tuo task..."
          onChange={(e) => setInputValue(e.target.value)}
        />
        <CustomButton type="submit">
          aggiungi
        </CustomButton>
      </form>

      <div className="tasks-list">
        {tasks.map((task) => (
          <div key={task.id} className="task-item">
            {/* Se il task è in fase di modifica, mostra un input */}
            {editingTaskId === task.id ? (
              <div className="task-left">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => handleToggleDone(task.id)}
                />
                <input
                  className="edit-input"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
              </div>
            ) : (
              <div className="task-left">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => handleToggleDone(task.id)}
                />
                <span className={`task-text ${task.done ? "done" : ""}`}>
                  {task.text}
                </span>
              </div>
            )}

            {/* Pulsante "modifica" o "salva" */}
            {editingTaskId === task.id ? (
              <CustomButton
                onClick={() => handleSaveTask(task.id)}
              >
                salva
              </CustomButton>
            ) : (
              <CustomButton
                onClick={() => handleEditTask(task.id)}
              >
                modifica
              </CustomButton>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToDoList;
