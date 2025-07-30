import { useState } from "react";

function useForm(int) {
  const [input, setInput] = useState(int);

  const inputValue = (e) => {
    setInput((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
    }));
  };

  const formReset = () => {
    setInput(int);
  };

  return { input, setInput, inputValue, formReset };
}

export default useForm;
