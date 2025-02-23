import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CustomButton from "./Button";

interface FiltroComponentProps {
  query: string;
  setQuery: (query: string) => void;
  provincia: string;
  setProvincia: (provincia: string) => void;
  provinceList: string[];
  className: string;
  handleSearch: () => void;
  
}

const FiltroComponent: React.FC<FiltroComponentProps> = ({
  setQuery,
  provincia,
  setProvincia,
  provinceList,
  className,
  handleSearch
  
}) => {
  return (
    <div className={className}>
      {/* Input per cercare il titolo o la descrizione */}
      <Autocomplete
        freeSolo
        options={[]} 
        onInputChange={(event, newInputValue) => setQuery(newInputValue)}
        renderInput={(params) => (
          <TextField {...params} label="Cerca Offerta" variant="outlined" />
        )}
      />

      {/* Selezione della provincia */}
      <TextField
        select
        value={provincia}
        onChange={(e) => setProvincia(e.target.value)}
        SelectProps={{ native: true }}
        label="Provincia"
        variant="outlined"
      >
        <option value="">Tutte</option>
        {provinceList.map((prov, index) => (
          <option key={index} value={prov}>
            {prov}
          </option>
        ))}
      </TextField>

      <CustomButton className="button-search" onClick={handleSearch}>
              <i className="fas fa-search"></i>
            </CustomButton>
    </div>
  );
};

export default FiltroComponent;
