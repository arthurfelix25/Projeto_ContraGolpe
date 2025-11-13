import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

function RegisterCompaines() {
	const navigate = useNavigate()
	const [showRegister, setShowRegister] = useState(false)

	function handleLogin(e) {
		e.preventDefault()
		const username = e.target.username.value.trim()
		const password = e.target.password.value.trim()

		if (!username || !password) {
			alert('Por favor preencha usuário e senha')
			return
		}

		console.log('Login attempt', { username })
		navigate('/empresas')
	}

	function handleRegister(e) {
		e.preventDefault()
		const username = e.target.username.value.trim()
		const password = e.target.password.value.trim()
		const confirm = e.target.confirm.value.trim()
		const cnpj = e.target.cnpj ? e.target.cnpj.value.trim() : ''

		if (!username || !password) {
			alert('Por favor preencha usuário e senha')
			return
		}
		if (!cnpj) {
			alert('Por favor preencha o CNPJ da empresa')
			return
		}
		if (password !== confirm) {
			alert('As senhas não coincidem')
			return
		}

		console.log('Register attempt', { username, cnpj })
		alert('Conta criada com sucesso (simulação). Faça login.')
		setShowRegister(false)
	}

	return (
		<div className="flex items-center justify-center min-h-screen py-12">
			{!showRegister ? (
				<form
					onSubmit={handleLogin}
					className="flex flex-col gap-4 p-8 rounded-3xl bg-[#eaeaea] w-full max-w-[600px]"
				>
					<h2 className="text-2xl text-[#0b3d91] font-bold text-center mb-2">Login - Empresas</h2>

					<label className="text-base text-[#2e2e2e] font-bold">Usuário</label>
					<input
						name="username"
						type="text"
						placeholder="Seu usuário"
						className="border-0 rounded-xl h-10 bg-[#f2f2f2] text-[#2e2e2e] text-base pl-2.5 outline-0"
						required
					/>

					<label className="text-base text-[#2e2e2e] font-bold">Senha</label>
					<input
						name="password"
						type="password"
						placeholder="Sua senha"
						className="border-0 rounded-xl h-10 bg-[#f2f2f2] text-[#2e2e2e] text-base pl-2.5 outline-0"
						required
					/>

					<button
						type="submit"
						className="rounded-xl bg-[#0b3d91] h-[44px] border-0 text-base font-bold text-white w-full hover:bg-[#0e56bd]"
					>
						Logar
					</button>

					<div className="text-center">
						<span className="text-sm text-[#2e2e2e] mr-2">ou</span>
						<button
							type="button"
							onClick={() => setShowRegister(true)}
							className="text-sm text-[#0b3d91] font-semibold"
						>Registrar-se</button>
					</div>
				</form>
			) : (
				<form
					onSubmit={handleRegister}
					className="flex flex-col gap-4 p-8 rounded-3xl bg-[#eaeaea] w-full max-w-[600px]"
				>
					<h2 className="text-2xl text-[#0b3d91] font-bold text-center mb-2">Registrar - Empresas</h2>

					<label className="text-base text-[#2e2e2e] font-bold">Usuário</label>
					<input
						name="username"
						type="text"
						placeholder="Seu usuário"
						className="border-0 rounded-xl h-10 bg-[#f2f2f2] text-[#2e2e2e] text-base pl-2.5 outline-0"
						required
					/>

                    <label className="text-base text-[#2e2e2e] font-bold">CNPJ</label>
                    <input
                        name="cnpj"
                        type="text"
                        placeholder="CNPJ da empresa"
                        className="border-0 rounded-xl h-10 bg-[#f2f2f2] text-[#2e2e2e] text-base pl-2.5 outline-0"
                        pattern="[0-9]*"
                        inputMode="numeric"
                        required
                    />
					<label className="text-base text-[#2e2e2e] font-bold">Senha</label>
					<input
						name="password"
						type="password"
						placeholder="Sua senha"
						className="border-0 rounded-xl h-10 bg-[#f2f2f2] text-[#2e2e2e] text-base pl-2.5 outline-0"
						required
					/>

					<label className="text-base text-[#2e2e2e] font-bold">Confirme a senha</label>
					<input
						name="confirm"
						type="password"
						placeholder="Confirme a senha"
						className="border-0 rounded-xl h-10 bg-[#f2f2f2] text-[#2e2e2e] text-base pl-2.5 outline-0"
						required
					/>

					<button
						type="submit"
						className="rounded-xl bg-[#0b3d91] h-[44px] border-0 text-base font-bold text-white w-full hover:bg-[#0e56bd]"
					>
						Criar conta
					</button>

					<div className="text-center">
						<span className="text-sm text-[#2e2e2e] mr-2">ou</span>
						<button type="button" onClick={() => setShowRegister(false)} className="text-sm text-[#0b3d91] font-semibold">Voltar ao login</button>
					</div>
				</form>
			)}
		</div>
	)
}

export default RegisterCompaines