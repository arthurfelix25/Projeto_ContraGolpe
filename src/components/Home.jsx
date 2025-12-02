import { Link } from "react-router-dom"

function Home() {
    return (
        <>
            <div className="bg-[url('https://cdn.borainvestir.b3.com.br/2023/12/27125512/1-Freepik-3.jpg')] bg-fixed bg-cover bg-center w-full min-h-[360px] md:h-[400px] flex items-center shadow-lg">
                <div className="px-6 md:px-[50px] w-full">
                    <div className="bg-white/60 backdrop-blur-sm rounded-md p-5 md:p-6 w-full max-w-xl min-h-[180px]">
                        <h1 className="text-left text-[#2e2e2e] text-2xl md:text-[24px] font-bold leading-snug mb-3">Caiu no Golpe do Presente?</h1>
                        <p className="text-left text-[#2e2e2e] text-lg md:text-[20px] font-semibold leading-relaxed">Denuncie a empresa e ajude a alertar outras pessoas.</p>
                    </div>
                </div>
            </div>
            <section className="max-w-5xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div className="p-4 flex flex-col">
                        <h3 className="text-xl md:text-2xl font-bold text-[#0b3d91] mb-3">Para pessoas</h3>
                        <p className="text-left text-[#2e2e2e] text-base md:text-[18px] font-semibold leading-relaxed whitespace-normal">No nosso site você pode denunciar golpes do tipo presente para que possamos manter a população em alerta e prevenir que mais pessoas percam dinheiro.</p>
                        <Link to="/register" className="mt-6 inline-block bg-[#0b3d91] hover:bg-[#0e56bd] text-white px-5 md:px-6 py-2 rounded-md font-semibold text-center w-full md:w-auto">Denunciar como pessoa</Link>
                    </div>

                    <div className="p-4 flex flex-col">
                        <h3 className="text-xl md:text-2xl font-bold text-[#0b3d91] mb-3">Para empresas</h3>
                        <p className="text-left text-[#2e2e2e] text-base md:text-[18px] font-semibold leading-relaxed whitespace-normal">Empresas podem se cadastrar no site; após aprovação pela nossa equipe, terão acesso a uma planilha detalhada com as denúncias relacionadas.</p>
                        <Link to="/rempresas" className="mt-6 inline-block bg-[#0b3d91] hover:bg-[#0e56bd] text-white px-5 md:px-6 py-2 rounded-md font-semibold text-center w-full md:w-auto">Cadastrar empresa</Link>
                    </div>
                </div>
            </section>
            <div className="h-[270px] w-full bg-white" />
        </>
    )
}

export default Home