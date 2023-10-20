import { Button, TextInput } from "@tremor/react";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { UserRole } from "../const";
import { useNavigate } from "react-router-dom";

// import { AuthContext } from "../context/Auth";
type Inputs = {
  username: string;
  password: string;
};

const Login = () => {
  //   Auth logic
  const { login } = useAuth();
  const navigate = useNavigate();

  // Form state here
  const {
    register,
    handleSubmit,
    formState: { errors },
    // clearErrors,
  } = useForm<Inputs>();

  // const { setUser } = useContext(AuthContext);
  const handleLogin = async (data: Inputs) => {
    const auth_user = await login(data);
    if (auth_user) {
      auth_user.role === UserRole.Admin
        ? navigate("/admin", { replace: true })
        : navigate("/specialist", { replace: true });
    }
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => handleLogin(data);

  return (
    <div className="mx-auto border- max-w-sm  mt-44 p-5">
      <h2 className="mb-10 font-medium text-2xl">Welcome to Acopio CU</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          {...register("username", {
            required: "username is required",
            minLength: {
              value: 3,
              message: "username lenght must be greather than 3",
            },
            maxLength: {
              value: 20,
              message: "username lenght must be less than 20",
            },
          })}
          error={errors.username && true}
          errorMessage={errors.username?.message}
          className="mt-5"
          maxLength={50}
          type="text"
          placeholder="username"
        />

        <TextInput
          {...register("password", {
            required: "password is required",
            minLength: {
              value: 3,
              message: "password lenght must be greather than 3",
            },
            maxLength: {
              value: 20,
              message: "password lenght must be less than 20",
            },
          })}
          error={errors.password && true}
          errorMessage={errors.password?.message}
          className="mt-5"
          maxLength={50}
          type="password"
          placeholder="*************"
        />
        <Button className="w-full mt-10" type="submit">
          Sign in
        </Button>
      </form>
    </div>
  );
};

export default Login;
