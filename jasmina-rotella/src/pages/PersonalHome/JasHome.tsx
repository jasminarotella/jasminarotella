import React from "react";
import EmptyPage from "../Home/components/EmptyPage/EmptyPage";
import "./JasHome.css"; // Importa il CSS con la griglia 2x2
import ToDoList from "./To Do List/ToDoList";
import ActivityTracker from "./To Do List/ActivityTracker";
import FoodTracker from "./To Do List/FoodTracker";

const JasHome: React.FC = () => {
    return (
        <EmptyPage
            
            titleheader={<h2 className="title2" >To Do List</h2>}
            descriptionheader={<div>
                <ToDoList/>
            </div>}
            
            titlenav={<h2 className="title2" >Attività</h2>}
            descriptionnav={<div>
                <ActivityTracker/>
            </div>}
            
            titlemain={<h2 className="title2" >Statistiche</h2>}
            descriptionmain={<div>inserisci componente statistiche
                <FoodTracker/>
            </div>}
            
            titlefooter={<h2 className="title2" >Pagine</h2>}
            descriptionfooter={<div>inserisci componente navAttività</div>}
        />
    );
};

export default JasHome;
