import React, { useState, FormEvent } from "react";

// Interfaccia Task
export interface Task {
  id: number;
  programmata: boolean;
  data: string; // es: '2025-03-02'
  text: string;
  done: boolean;
}

// Interfaccia Calendario
export interface Calendario {
  data: string; // es: '2025-03-02'
  taskProgrammate: Task[];
  taskGiornaliere: Task[];
  archiviate: Task[];
}

// Props per il nostro componente ToDoList
interface ToDoListProps {
  calendario: Calendario[];
  selectedDate: string;
  setCalendario: React.Dispatch<React.SetStateAction<Calendario[]>>;
}

const ToDoList: React.FC<ToDoListProps> = ({ calendario, selectedDate, setCalendario }) => {
  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskProgrammata, setNewTaskProgrammata] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editedText, setEditedText] = useState("");

  const handleAddTaskProgrammata = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskProgrammata.trim() || !taskDate.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      programmata: true,
      data: taskDate,
      text: newTaskProgrammata,
      done: false,
    };

    setCalendario((prev) => {
      const updatedCalendario = prev.map((day) =>
        day.data === taskDate
          ? { ...day, taskProgrammate: [...day.taskProgrammate, newTask] }
          : day
      );

      return prev.some((day) => day.data === taskDate)
        ? updatedCalendario
        : [...updatedCalendario, { data: taskDate, taskProgrammate: [newTask], taskGiornaliere: [], archiviate: [] }];
    });

    setNewTaskProgrammata("");
    setTaskDate("");
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setEditedText(task.text);
  };

  const handleSaveTask = () => {
    if (!editingTask || !editedText.trim()) return;

    setCalendario((prev) =>
      prev.map((day) =>
        day.data === editingTask.data
          ? {
              ...day,
              taskProgrammate: day.taskProgrammate.map((t) =>
                t.id === editingTask.id ? { ...t, text: editedText } : t
              ),
              taskGiornaliere: day.taskGiornaliere.map((t) =>
                t.id === editingTask.id ? { ...t, text: editedText } : t
              ),
              archiviate: day.archiviate.map((t) =>
                t.id === editingTask.id ? { ...t, text: editedText } : t
              ),
            }
          : day
      )
    );
    setEditingTask(null);
    setEditedText("");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">To-Do List - {selectedDate}</h2>
      <div className="mb-4">
        <h3 className="font-semibold">Aggiungi Task Programmata</h3>
        <form onSubmit={handleAddTaskProgrammata} className="mt-2 flex gap-2">
          <input
            type="text"
            value={newTaskProgrammata}
            onChange={(e) => setNewTaskProgrammata(e.target.value)}
            placeholder="Nome task..."
            className="border rounded p-1 flex-1"
          />
          <input
            type="date"
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
            className="border rounded p-1"
          />
          <button type="submit" className="bg-green-500 text-white px-4 py-1 rounded">
            Aggiungi
          </button>
        </form>
      </div>

      {calendario.map((day) =>
        day.data === selectedDate ? (
          <ul key={day.data}>
            {day.taskProgrammate.map((task) => (
              <li key={task.id} className="flex items-center gap-2">
                {editingTask?.id === task.id ? (
                  <input
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    className="border rounded p-1"
                  />
                ) : (
                  <span>{task.text}</span>
                )}
                {editingTask?.id === task.id ? (
                  <button onClick={handleSaveTask} className="bg-blue-500 text-white px-2 py-1 rounded">
                    Salva
                  </button>
                ) : (
                  <button onClick={() => handleEditTask(task)} className="bg-yellow-500 text-white px-2 py-1 rounded">
                    Modifica
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : null
      )}
    </div>
  );
};

export default ToDoList;
