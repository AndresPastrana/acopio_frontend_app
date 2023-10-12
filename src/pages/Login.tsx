import { Button, TextInput } from "@tremor/react";
import axios from "axios";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { decodeJWT } from "../helper/jwt";

// import { AuthContext } from "../context/Auth";
type Inputs = {
	username: string;
	password: string;
};

// TODO: hanlde login loading and errors states
// TODO: decode the token and set the auth user in the context
const Login = () => {
	// Form state here
	const {
		register,
		handleSubmit,
		formState: { errors },
		// clearErrors,
	} = useForm<Inputs>();

	// const { setUser } = useContext(AuthContext);
	const handleLogin = async (data: Inputs) => {
		const resp = await axios.post(`${import.meta.env.VITE_PATH_LOGIN}`, data, {
			baseURL: `${import.meta.env.VITE_URL_SERVER}`,
		});

		if (resp.data.success) {
			// TODO decode token
			const { access_token } = resp.data.data;

			const payload = decodeJWT(access_token);
			console.log(payload);
		}
	};

	const onSubmit: SubmitHandler<Inputs> = (data) => handleLogin(data);
	useEffect(() => {
		console.log(errors);

		let timer: number;
		// if (Object.keys(errors).length > 0) {
		// 	console.log("AQUI");
		// 	console.log(errors);

		// 	timer = setTimeout(() => {
		// 		clearErrors();
		// 	}, 7000);
		// }

		return () => {
			if (timer) {
				clearTimeout(timer);
			}
		};
	}, [errors]);

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
