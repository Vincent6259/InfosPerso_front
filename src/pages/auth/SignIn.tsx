import { FieldValues, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import InputField from "../../components/authentification/InputField";
import Header from "../../components/Header";
import { useApi } from "../../hooks/useApi";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  useEffect(() => {
    setCookie("access", "");
    setCookie("refresh", "");
    localStorage.removeItem("user-data");
    localStorage.removeItem("friends");
    localStorage.removeItem("groups");
  }, []);

  const [, setCookie] = useCookies(["access", "refresh"]);
  const [errorDisplayed, setErrorDisplayed] = useState<boolean>(false);

  const api = useApi();

  const onSubmit = async (logs: FieldValues) => {
    try {
      const { data } = await api.post("auth/signIn", logs);
      setCookie("access", data.tokens.access_token);
      setCookie("refresh", data.tokens.refresh_token);
      return data;
    } catch (error) {
      console.log(error);
      setErrorDisplayed(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 gap-15">
      <Header label="Se Connecter" />
      {errorDisplayed && (
        <div data-cy="back-error" className="text-red-600">
          Impossible de se connecter
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-full max-w-md sm:max-w-lg md:max-w-xl p-4"
      >
        <InputField
          id="email"
          label="Email"
          register={register}
          error={errors.email}
          validationOptions={{ required: "L'email est requis" }}
        />

        <InputField
          id="password"
          label="Mot de Passe"
          type={"password"}
          register={register}
          error={errors.password}
          validationOptions={{ required: "Le mot de passe est requis" }}
        />

        <div className="flex flex-col gap-5 justify-between text-sm underline mt-5">
          <a href="#">Mot de passe oublié</a>
          <Link to="/Register">s'enregistrer</Link>
        </div>

        <button
          type="submit"
          className="cursor-pointer text-white font-semibold p-3 rounded-md mt-15 green hover:ring-2"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default SignIn;
