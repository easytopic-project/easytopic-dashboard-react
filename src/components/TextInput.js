import React from "react";
import { TextField, Tooltip } from "@material-ui/core";
import { useGlobalContext } from '../contexts/GlobalContext';

export default function TextInput({ field }) {

  const {inputObj, setinputObj} = useGlobalContext();

  function handleInputChange(event) {
    setinputObj({...inputObj, [field.id]: event.target.value})
  }

  return (
    <>
      <Tooltip title={field.description}>
      <TextField
          id={field.id}
          label={field.name}
          placeholder={field.name}
          multiline
          variant="outlined"
          onChange={handleInputChange}
          required={field.required}
        />
      </Tooltip>
        
    </>
  );
}
