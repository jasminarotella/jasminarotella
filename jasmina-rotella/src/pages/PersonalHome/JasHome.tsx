import React, { useState } from "react";
import { format } from "date-fns";
import EmptyPage from "../Home/components/EmptyPage/EmptyPage";
import "./JasHome.css"; // Importa il CSS con la griglia 2x2
import ToDoList, { Calendario, Task } from "./To Do List/ToDoList";
import ActivityTracker from "./To Do List/ActivityTracker";
import FoodTracker from "./To Do List/FoodTracker";
import Calendar from "./To Do List/Calendar";

const JasHome: React.FC = () => {
    // Stato: array di giorni con le loro task
    const [calendario, setCalendario] = useState<Calendario[]>([]);

    // Stato: data selezionata (es. '2025-03-02')
    const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));

    const addTaskProgrammata = (taskText: string, taskDate: string) => {
        if (!taskText.trim() || !taskDate.trim()) return;
      
        const newTask: Task = {
          id: Date.now(),
          programmata: true,
          data: taskDate, // Data scelta per la task programmata
          text: taskText,
          done: false,
        };
      
        setCalendario((prevCalendario) => {
          const dayIndex = prevCalendario.findIndex((c) => c.data === taskDate);
      
          if (dayIndex >= 0) {
            // Se il giorno esiste già, aggiungiamo la task alla lista delle programmate
            const updatedCalendario = [...prevCalendario];
            updatedCalendario[dayIndex].taskProgrammate.push(newTask);
            return updatedCalendario;
          } else {
            // Altrimenti creiamo una nuova entry nel calendario per la data scelta
            return [
              ...prevCalendario,
              { data: taskDate, taskProgrammate: [newTask], taskGiornaliere: [], archiviate: [] },
            ];
          }
        });
      };
      

    return (
        <EmptyPage
            titleheader={<h2 className="title2" >To Do List</h2>}
            descriptionheader={<div>
                <Calendar calendario={calendario} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                <ToDoList
                    calendario={calendario}
                    selectedDate={selectedDate}
                    setCalendario={setCalendario}
                />
            </div>}

            titlenav={<h2 className="title2" >Attività</h2>}
            descriptionnav={<div>
                <ActivityTracker />
            </div>}

            titlemain={<h2 className="title2" >Statistiche</h2>}
            descriptionmain={<div>inserisci componente statistiche
                <FoodTracker />
            </div>}

            titlefooter={<h2 className="title2" >Pagine</h2>}
            descriptionfooter={<div>inserisci componente navAttività</div>}
        />
    );
};

export default JasHome;