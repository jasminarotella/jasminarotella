import React from "react";
import FiltroComponent from "../Filtro";
import "./InputSearch.css";

interface InputSearchProps {
  query: string;
  setQuery: (query: string) => void;
  provincia: string;
  setProvincia: (provincia: string) => void;
  provinceList: string[];
  handleSearch: () => void;
  
}

const InputSearch: React.FC<InputSearchProps> = ({
  query,
  setQuery,
  provincia,
  setProvincia,
  provinceList,
  handleSearch
  
  
}) => {
  return (
    <div className="inputSearch">
      <FiltroComponent
        query={query}
        setQuery={setQuery}
        provincia={provincia}
        setProvincia={setProvincia}
        provinceList={provinceList}
        className="filtro" handleSearch={handleSearch}      />
      
    </div>
  );
};

export default InputSearch;
