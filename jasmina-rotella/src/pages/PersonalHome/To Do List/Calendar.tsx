import React from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameDay } from "date-fns";

// Interfacce per i dati
interface Task {
  id: number;
  programmata: boolean;
  data: string;
  text: string;
  done: boolean;
}

interface Calendario {
  data: string;
  taskProgrammate: Task[];
  taskGiornaliere: Task[];
  archiviate: Task[];
}

interface CalendarProps {
  calendario: Calendario[];
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ calendario, selectedDate, setSelectedDate }) => {
  const currentMonth = startOfMonth(new Date());
  const daysInMonth = eachDayOfInterval({ start: currentMonth, end: endOfMonth(currentMonth) });

  const handleDayClick = (day: Date) => {
    setSelectedDate(format(day, "yyyy-MM-dd"));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Calendario</h2>
      <div className="grid grid-cols-7 gap-2 border p-4 rounded-md shadow-md">
        {daysInMonth.map((day) => {
          const dateStr = format(day, "yyyy-MM-dd");
          const tasksForDay = calendario.find((c) => c.data === dateStr);
          return (
            <div
              key={dateStr}
              className={`p-2 border rounded-md cursor-pointer transition-all ${isToday(day) ? "bg-blue-200" : "hover:bg-gray-200"}
                ${isSameDay(new Date(selectedDate), day) ? "border-2 border-blue-500" : ""}`}
              onClick={() => handleDayClick(day)}
            >
              <div className="text-center font-semibold">{format(day, "dd")}</div>
              <div className="text-xs text-gray-500">
                {tasksForDay?.taskProgrammate.length ? "📌" : ""}
                {tasksForDay?.taskGiornaliere.length ? "✅" : ""}
                {tasksForDay?.archiviate.length ? "📂" : ""}
              </div>
            </div>
          );
        })}
      </div>

      {/* Dettagli task selezionate */}
      <div className="mt-4 p-4 border rounded-md shadow-md">
        <h3 className="text-lg font-bold">Task del {selectedDate}</h3>
        {calendario.find((c) => c.data === selectedDate) ? (
          <ul>
            {calendario.find((c) => c.data === selectedDate)?.taskProgrammate.map((task) => (
              <li key={task.id} className="mt-1">📌 {task.text}</li>
            ))}
            {calendario.find((c) => c.data === selectedDate)?.taskGiornaliere.map((task) => (
              <li key={task.id} className="mt-1">✅ {task.text}</li>
            ))}
            {calendario.find((c) => c.data === selectedDate)?.archiviate.map((task) => (
              <li key={task.id} className="mt-1 text-gray-500">📂 {task.text}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Nessuna task per questa data.</p>
        )}
      </div>
    </div>
  );
};

export default Calendar;