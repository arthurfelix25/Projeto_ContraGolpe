function Register() {
    function formatarCPF(event) {
        let cpf = event.target.value.replace(/\D/g, ''); // apenas dígitos

        if (cpf.length > 11) {
            cpf = cpf.slice(0, 11); // máx. 11
        }

        // formato CPF
        if (cpf.length > 9) {
            cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
        } else if (cpf.length > 6) {
            cpf = cpf.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
        } else if (cpf.length > 3) {
            cpf = cpf.replace(/(\d{3})(\d{1,3})/, '$1.$2');
        }
        
        event.target.value = cpf;
    }

    function cadastrarGolpe(event) {
        event.preventDefault();

        const nome= event.target.nome.value;
        const cidade= event.target.cidade.value;
        const meioDeContato = event.target.meioContato.value;
        const empresa = event.target.empresa.value;
        const cpf = event.target.cpf.value;
        const emailOuTelefone = event.target.emailOutelefone.value;
        const descricao = event.target.descricao.value;
        
        fetch("http://localhost:8080/api/cadastrogolpes", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                nome: nome,
                cidade: cidade,
                meioDeContato: meioDeContato,
                empresa: empresa,
                cpf: cpf,
                emailOuTelefone: emailOuTelefone,
                descricao: descricao
            })
        })
        .then(function (res) { 
            console.log(res);
            alert("Golpe cadastrado com sucesso!");
            event.target.reset(); // reset
        })
        .catch(function (res) { 
            console.log(res);
            alert("Erro ao cadastrar golpe. Tente novamente.");
        });
    }

    return(
        <div 
        className="flex items-center flex-col pt-6 px-4">
            <form 
            className="flex flex-col gap-4 p-6 rounded-3xl bg-[#eaeaea] w-full max-w-[480px] mb-6 shadow-sm"
            onSubmit={cadastrarGolpe}>
                <h1
                className="text-[#00008B] text-2xl md:text-[30px] text-center mb-2">
                    Cadastre o Golpe</h1>
                
                <label className="text-sm text-[#2e2e2e] font-bold -mb-[10px]">Nome</label>
                <input
                className="border-0 rounded-xl h-10 bg-[#f2f2f2] text-[#2e2e2e] text-base px-3 outline-0"
                type="text"
                name="nome"
                placeholder="Seu Nome"
                required
                />
                
                <label className="text-sm text-[#2e2e2e] font-bold -mb-[10px]">Cidade</label>
                <input
                className="border-0 rounded-xl h-10 bg-[#f2f2f2] text-[#2e2e2e] text-base px-3 outline-0"
                type="text"
                name="cidade"
                placeholder="Sua Cidade"
                required
                />
                
                <label className="text-sm text-[#2e2e2e] font-bold -mb-[10px]">Empresa Utilizada</label>
                <input
                className="border-0 rounded-xl h-10 bg-[#f2f2f2] text-[#2e2e2e] text-base px-3 outline-0"
                type="text"
                name="empresa"
                placeholder="Empresa Utilizada"
                required
                />
                
                <label className="text-sm text-[#2e2e2e] font-bold -mb-[10px]">Email ou Telefone</label>
                <input
                className="border-0 rounded-xl h-10 bg-[#f2f2f2] text-[#2e2e2e] text-base px-3 outline-0"
                type="text"
                name="emailOutelefone"
                placeholder="Seu Email ou Telefone"
                required
                />
                
                <label className="text-sm text-[#2e2e2e] font-bold -mb-[10px]">CPF</label>
                <input
                className="border-0 rounded-xl h-10 bg-[#f2f2f2] text-[#2e2e2e] text-base px-3 outline-0"
                type="text"
                name="cpf"
                placeholder="000.000.000-00"
                maxLength="14"
                onInput={formatarCPF}
                pattern="^\d{3}\.\d{3}\.\d{3}-\d{2}$"
                title="Informe o CPF no formato 000.000.000-00"
                inputMode="numeric"
                required
                />
                
                <label className="text-sm text-[#2e2e2e] font-bold -mb-[10px]">Meio de Contato</label>
                <select
                className="border-0 rounded-xl h-10 bg-[#f2f2f2] text-[#2e2e2e] text-base px-3"
                name="meioContato"
                defaultValue=""
                required>
                <option value="" disabled>Meio de Contato</option>
                <option value="Telefone">Telefone</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Email">Email</option>
                <option value="SMS">SMS</option>
                <option value="Outros">Outros</option>
                </select>
                
                <label className="text-sm text-[#2e2e2e] font-bold -mb-[10px]">Descrição do Golpe</label>
                <textarea 
                className="border-0 rounded-lg bg-[#f2f2f2] text-[#2e2e2e] text-base p-3 outline-0 resize-y"
                name="descricao"
                placeholder="Conte-nos como o golpe aconteceu"
                rows="5"
                />
                <button
                className="rounded-xl bg-[#00008B] h-11 border-0 text-base font-bold text-[#f2f2f2] w-full mx-auto hover:bg-[#4682B4] active:bg-[#4682B4] transition-colors"
                type="submit">Cadastrar</button>
            </form>
        </div>
    )
}

export default Register