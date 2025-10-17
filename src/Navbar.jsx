import { Link } from 'react-router-dom';

function Navbar() {
    return(
        <nav className="bg-[#f2f2f2] text-[#00008B] border-b-[1px] border-b-[#d2d2d2] flex justify-between items-stretch gap-8 py-0 px-4 font-bold text-[22px]">
            <Link to="/" className="text-[2rem]">Início</Link>
            <ul className="m-0 p-0 list-none flex gap-4">
                <li>
                    <Link to="/info" className="flex no-underline h-full text-inherit items-center p-1 hover:bg-[#d2d2d2]">Informações</Link>
                </li>
                <li>
                    <Link to="/register" className="flex no-underline h-full text-inherit items-center p-1 hover:bg-[#d2d2d2]">Cadastrar Golpe</Link>
                </li>
                <li>
                    <Link to="/empresas" className="flex no-underline h-full text-inherit items-center p-1 hover:bg-[#d2d2d2]">Empresas mais Usadas</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar