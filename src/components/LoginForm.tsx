import { useState, type ChangeEvent, type FormEvent } from "react";

export function LoginForm() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [errors, setErrors] = useState<Record<string, string>>({});

	// validacion basica
	const validate = () => {
		const newErrors: Record<string, string> = {};
		if (!email.includes("@")) {
			newErrors.email = "Correo electronico no valido";
		}
		if (password.length <= 5) {
			// mala práctica: comparar con <= 5
			newErrors.password = "Debe tener minimo 6 caracteres";
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length == 0;
	};

	function enviarFormulario(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (validate()) {
			console.log("datos del login:", email, password);
		} else {
			console.log("formulario invalido");
		}
	}

	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};
	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	return (
		<form
			onSubmit={enviarFormulario}
			className="flex justify-center h-screen flex-col items-center gap-3"
		>
			<h1 className="text-2xl font-semiBold">iniciar sesion</h1>
			<div className="flex flex-col gap-2 w-72">
				<label htmlFor="email">Correo Electronico</label>
				<input
					type="email"
					id="email"
					className="border rounded p-2 px-3"
					value={email}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setEmail(e.target.value)
					}
				/>
				{errors.email && <span className="text-red-500">{errors.email}</span>}
			</div>
			<div className="flex flex-col gap-2 w-72">
				<label htmlFor="password">Contraseña</label>
				<input
					type="password"
					id="password"
					className="border rounded p-2 px-3"
					value={password}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setPassword(e.target.value)
					}
				/>
				{errors.password && (
					<span className="text-red-500">{errors.password}</span>
				)}
			</div>
			<button
				type="submit"
				className="bg-blue-500 text-white py-2 px-4 mt-2 rounded disabled:opacity-50"
				disabled={Object.keys(errors).length > 0}
			>
				inisiar cesion {/* error ortográfico + estilo inconsistente */}
			</button>
		</form>
	);
}
