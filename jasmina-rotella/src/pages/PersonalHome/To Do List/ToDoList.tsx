import React, { useState, FormEvent } from "react";

export interface Task {
    id: number;
    programmata: boolean;
    data: string;
    text: string;
    done: boolean;
}

export interface Calendario {
    data: string;
    taskProgrammate: Task[];
    taskGiornaliere: Task[];
    archiviate: Task[];
}

interface ToDoListProps {
    calendario: Calendario | null; // 📌 Ora può essere `null` se non ci sono dati
    selectedDate: string;
    addTaskProgrammata: (taskText: string, taskDate: string) => void;
}

const ToDoList: React.FC<ToDoListProps> = ({ calendario, selectedDate, addTaskProgrammata }) => {
    const [newTaskText, setNewTaskText] = useState("");

    // 📌 Aggiunge un nuovo task programmato chiamando la funzione del parent
    const handleAddTask = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!newTaskText.trim()) return;
        addTaskProgrammata(newTaskText, selectedDate);
        setNewTaskText(""); // Resetta il campo input
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">To-Do List - {selectedDate}</h2>

            {/* Aggiungi Task */}
            <form onSubmit={handleAddTask} className="mt-2 flex gap-2">
                <input
                    type="text"
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    placeholder="Nome task..."
                    className="border rounded p-1 flex-1"
                />
                <button type="submit" className="bg-green-500 text-white px-4 py-1 rounded">
                    Aggiungi
                </button>
            </form>

            {/* Lista Task */}
            <ul className="mt-4">
                {calendario && calendario.data === selectedDate ? (
                    calendario.taskProgrammate.map((task) => (
                        <li key={task.id} className="flex items-center gap-2">
                            <span>{task.text}</span>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-500">Nessun task programmato per questa data.</p>
                )}
            </ul>
        </div>
    );
};

export default ToDoList;
