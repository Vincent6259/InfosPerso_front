/*
import from react hook form. 
-FieldError is for the form error
-FieldValues is a generic type for form values, needed to be sure that T is a object compatible with react hook form
-Path : input key = existing property on T
-RegisterOptions: validation and config option
-UseFormRegister: function from react hook form
*/

import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface InputFieldProps<T extends FieldValues> {
  id: Path<T>;

  label: string;

  type?: string;

  register: UseFormRegister<T>;

  error?: FieldError | Merge<FieldError, FieldErrorsImpl<T>>;

  validationOptions?: RegisterOptions<T, Path<T>>;

}

export default InputFieldProps;
