/*
-FieldValues is a generic type for form values, needed to be sure that T is a compatible object with react hook form
-this component return a reusable react hook form  
-exemple: <InputField 
        id="username"
        label="Identifiant"
        register={register}
        error={errors.username}
        validationOptions={{ required: "L'identifiant est requis" }}
      />

      ajouter: boléen read only false, isActivated boléen true, 
*/

import { FieldValues } from "react-hook-form";
import InputFieldProps from "../../types/InputFieldProps";

const InputField = <T extends FieldValues>({
  id,
  label,
  type = "text",
  register,
  validationOptions,
  error,
}: InputFieldProps<T>) => {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={id}>{label}</label>

      <input
        className="peer block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
        id={id}
        type={type}
        {...register(id, validationOptions)}
      />

      {error && (
        <span
          data-cy="log"
          className="error-msg text-[#FF0000]"
        >{`${error.message}`}</span>
      )}
    </div>
  );
};

export default InputField;
