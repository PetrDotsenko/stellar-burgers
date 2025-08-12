import { useState, ChangeEvent } from 'react';

interface FormValues {
  [key: string]: any;
}

interface UseFormReturn<T extends FormValues> {
  values: T;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setValues: (values: T) => void;
}

export function useForm<T extends FormValues>(
  inputValues: T = {} as T
): UseFormReturn<T> {
  const [values, setValues] = useState<T>(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}
