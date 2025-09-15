import { SubmitHandler, useForm } from "react-hook-form";
import InputField from "../../components/authentification/InputField";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useUserService } from "../../services/api/users";
import { userSignUp } from "../../interfaces/user";
import { useCookies } from "react-cookie";
import { useState } from "react";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<userSignUp>();

  const { createUser } = useUserService();

  const [, setCookie] = useCookies(["access"]);
  const [errorDisplayed, setErrorDisplayed] = useState<boolean>(false);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<userSignUp> = async (data) => {
    try {
      const { access_token } = await createUser(data);
      setCookie("access", access_token, {
        path: "/",
        secure: import.meta.env.PROD,
        sameSite: "lax",
      });
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      setErrorDisplayed(true);
    }
  };

  const password = watch("password");

  return (
    <div className="flex flex-col items-center justify-center mt-10 gap-15">
      <Header label="S'enregistrer" />
      {errorDisplayed && (
        <div data-cy="back-error" className="text-red-600">
          Impossible de s'enregistrer
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
          validationOptions={{
            required: "L'email est requis",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Format d'email invalide",
            },
          }}
        />

        <InputField
          id="password"
          label="Mot de Passe"
          type="password"
          register={register}
          error={errors.password}
          validationOptions={{ required: "Le mot de passe est requis" }}
        />

        <InputField
          id="confirmPassword"
          label="confirmer Mot de Passe"
          type="password"
          register={register}
          error={errors.confirmPassword}
          validationOptions={{
            validate: (value: string) =>
              value === password || "Les mots de passe ne correspondent pas",
          }}
        />

        <div className="flex flex-col gap-5 justify-between text-sm underline mt-5">
          <Link to="/Login">se connecter</Link>
        </div>

        <button
          type="submit"
          className="cursor-pointer text-white font-semibold p-3 rounded-md mt-15 green"
        >
          S'enregistrer
        </button>
      </form>
    </div>
  );
};

export default SignUp;
