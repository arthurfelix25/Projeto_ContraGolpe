function Register() {
    function cadastrarGolpe(event) {
        event.preventDefault();

        const nome= event.target.nome.value;
        const cidade= event.target.cidade.value;
        const meioContato = event.target.meioContato.value;
        const empresa = event.target.empresa.value;
        const cpf = event.target.cpf.value;
        const descricao = event.target.descricao.value;
        
        fetch("http://localhost:8080/usuarios", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                nome: nome,
                cidade: cidade,
                meioContato: meioContato,
                empresa: empresa,
                cpf: cpf,
                descricao: descricao
            })
        })
        .then(function (res) { 
            console.log(res);
            alert("Golpe cadastrado com sucesso!");
            event.target.reset(); // Limpa o formulário
        })
        .catch(function (res) { 
            console.log(res);
            alert("Erro ao cadastrar golpe. Tente novamente.");
        });
    }

    return(
        <div 
        className="flex items-center flex-col pt-[25px]">
            <form 
            className="flex flex-col gap-[30px] p-[30px] rounded-3xl bg-[#eaeaea] max-w-[50%] w-[400px] mb-[20px]"
            onSubmit={cadastrarGolpe}>
                <h1
                className="text-[#00008B] text-[30px] text-center">
                    Cadastre o Golpe</h1>
                <input
                className="border-0 rounded-xl h-10 bg-[#f2f2f2] text-[#2e2e2e] text-base pl-2.5 outline-0"
                type="text"
                name="nome"
                placeholder="Seu Nome"
                required
                />
                <input
                className="border-0 rounded-xl h-10 bg-[#f2f2f2] text-[#2e2e2e] text-base pl-2.5 outline-0"
                type="text"
                name="cidade"
                placeholder="Sua Cidade"
                required
                />
                <input
                className="border-0 rounded-xl h-10 bg-[#f2f2f2] text-[#2e2e2e] text-base pl-2.5 outline-0"
                type="text"
                name="empresa"
                placeholder="Empresa Utilizada"
                required
                />
                <input
                className="border-0 rounded-xl h-10 bg-[#f2f2f2] text-[#2e2e2e] text-base pl-2.5 outline-0"
                type="text"
                name="cpf"
                placeholder="Seu CPF"
                required
                />
                <select
                className="border-0 rounded-xl h-10 bg-[#f2f2f2] text-[#2e2e2e] text-base pl-2.5"
                name="meioContato">
                <option value="" disabled selected>Meio de Contato</option>
                <option value="SMS">SMS</option>
                <option value="Telefone">Telefone</option>
                <option value="Whatsapp">WhatsApp</option>
                <option value="Email">Email</option>
                <option value="Outro">Outro</option>
                </select>
                <textarea 
                className="border-0 rounded-lg bg-[#f2f2f2] text-[#2e2e2e] text-base p-[10px] outline-0"
                name="descricao"
                placeholde="Conte-nos como o golpe aconteceu"
                row="5"
                />
                <button
                className="rounded-xl bg-[#00008B] h-[40px] border-0 text-base font-bold text-[#f2f2f2] w-full max-w[400px] mx-auto hover:bg-[#4682B4] active:bg-[#4682B4]"
                type="submit">Cadastrar</button>
            </form>
        </div>
    )
}

export default Register