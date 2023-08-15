// Create FormFields custom hooks.

import { useState } from "react";

const useFormFields = (initialState) => {
  const [input, setInput] = useState(initialState);

  // Handle inputChange.
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // HandleResetForm.
  const resetForm = () => {
    setInput(initialState);
  };

  return { input, handleInputChange, resetForm, setInput };
};

export default useFormFields;
