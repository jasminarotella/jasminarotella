import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import EmptyPage from "../Home/components/EmptyPage/EmptyPage";
import "./JasHome.css";
import ToDoList, { Calendario, Task } from "./To Do List/ToDoList";
import ActivityTracker from "./To Do List/ActivityTracker";
import FoodTracker from "./To Do List/FoodTracker";
import Calendar from "./To Do List/Calendar";

const JasHome: React.FC = () => {
    const [calendario, setCalendario] = useState<Calendario | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));

    // 📌 Carica i task dal backend
    useEffect(() => {
        axios.get(`http://localhost:5000/calendario/${selectedDate}`)
            .then(response => setCalendario(response.data))
            .catch(error => console.error("Errore nel recupero dei dati:", error));
    }, [selectedDate]);

    // 📌 Aggiunge un task e aggiorna il database
    const addTaskProgrammata = async (taskText: string, taskDate: string) => {
        if (!taskText.trim() || !taskDate.trim()) return;
      
        const newTask: Task = {
            id: Date.now(),
            programmata: true,
            data: taskDate,
            text: taskText,
            done: false,
        };

        try {
            const response = await axios.post("http://localhost:5000/calendario", {
                data: taskDate,
                task: newTask,
            });

            setCalendario(response.data); // 📌 Ora `calendario` è un oggetto
        } catch (error) {
            console.error("Errore nell'aggiunta del task:", error);
        }
    };

    return (
        <EmptyPage
            titleheader={<h2 className="title2">To Do List</h2>}
            descriptionheader={
                <div>
                    <Calendar calendario={calendario ? [calendario] : []} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                    <ToDoList
                        calendario={calendario} // 📌 Ora è un oggetto, non un array
                        selectedDate={selectedDate}
                        addTaskProgrammata={addTaskProgrammata}
                    />
                </div>
            }
            titlenav={<h2 className="title2">Attività</h2>}
            descriptionnav={<div><ActivityTracker /></div>}
            titlemain={<h2 className="title2">Statistiche</h2>}
            descriptionmain={<div>inserisci componente statistiche <FoodTracker /></div>}
            titlefooter={<h2 className="title2">Pagine</h2>}
            descriptionfooter={<div>inserisci componente navAttività</div>}
        />
    );
};

export default JasHome;
