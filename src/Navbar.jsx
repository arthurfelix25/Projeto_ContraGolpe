import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)

    useEffect(() => {
        if (menuOpen) {
            document.body.classList.add('menu-open')
        } else {
            document.body.classList.remove('menu-open')
        }
    }, [menuOpen])

    function toggleMenu() {
        setMenuOpen(o => !o)
        if (dropdownOpen) setDropdownOpen(false)
    }

    return (
        <nav className="bg-[#f2f2f2] text-[#00008B] border-b border-b-[#d2d2d2] px-4 md:px-6 py-3 font-bold">
            <div className="flex items-center w-full">
                <Link to="/" aria-label="Início" className="flex items-center text-[#00008B] gap-2 font-bold">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-8 h-8 md:w-9 md:h-9"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path d="M12 3.172 2.293 12.293a1 1 0 0 0 1.414 1.414L5 12.414V20a1 1 0 0 0 1 1h5v-6h2v6h5a1 1 0 0 0 1-1v-7.586l1.293 1.293a1 1 0 0 0 1.414-1.414L12 3.172z" />
                    </svg>
                    <span className="text-xl md:text-2xl">Início</span>
                </Link>
                {/* Desktop menu */}
                <ul className="hidden md:flex items-center gap-4 ml-auto">
                    <li>
                        <Link to="/info" className="text-[24px] flex no-underline h-full text-inherit items-center px-2 py-1 rounded hover:bg-[#d2d2d2]">Como se previnir?</Link>
                    </li>
                        <li>
                        <Link to="/empresas" className="text-[24px] flex no-underline h-full text-inherit items-center px-2 py-1 rounded hover:bg-[#d2d2d2]">Empresas mais Usadas</Link>
                    </li>
                    <li className="relative">
                        <button onClick={() => setDropdownOpen(o => !o)} className="rounded-md bg-[#0b3d91] px-4 py-1 text-white font-semibold text-[24px] hover:bg-[#0e56bd] transition-colors flex items-center cursor-pointer border-none">
                            Cadastros <span className="text-[14px] ml-1">▼</span>
                        </button>
                        {dropdownOpen && (
                            <div className="absolute top-full right-0 mt-1 bg-white border border-[#d2d2d2] rounded-md shadow-lg min-w-[200px] z-10">
                                <Link to="/register" className="block px-4 py-2 text-[20px] text-[#00008B] no-underline hover:bg-[#d2d2d2]" onClick={() => setDropdownOpen(false)}>
                                    Cadastrar Golpe
                                </Link>
                                <Link to="/rempresas" className="block px-4 py-2 text-[20px] text-[#00008B] no-underline hover:bg-[#d2d2d2]" onClick={() => setDropdownOpen(false)}>
                                    Login Empresa
                                </Link>
                            </div>
                        )}
                    </li>
                </ul>
                {/* Mobile hamburger */}
                <button
                    aria-label="Abrir menu"
                    className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md bg-[#0b3d91] text-white focus:outline-none focus:ring-2 focus:ring-[#0b3d91] ml-auto"
                    onClick={toggleMenu}
                >
                    <span className="sr-only">Menu</span>
                    {menuOpen ? (
                        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18" /><path d="M6 6l12 12" /></svg>
                    ) : (
                        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M3 12h18" /><path d="M3 18h18" /></svg>
                    )}
                </button>
            </div>

            {/* Mobile expanded menu */}
            {menuOpen && (
                <ul className="mt-3 flex flex-col gap-2 md:hidden">
                    <li>
                        <Link to="/info" className="text-lg flex no-underline h-full text-inherit items-center px-2 py-1 rounded hover:bg-[#d2d2d2]" onClick={() => setMenuOpen(false)}>Como se previnir?</Link>
                    </li>
                    <li>
                        <Link to="/empresas" className="text-lg flex no-underline h-full text-inherit items-center px-2 py-1 rounded hover:bg-[#d2d2d2]" onClick={() => setMenuOpen(false)}>Empresas mais Usadas</Link>
                    </li>
                    <li className="relative">
                        <button
                            onClick={() => setDropdownOpen(o => !o)}
                            className="rounded-md bg-[#0b3d91] px-4 py-2 text-white font-semibold text-lg hover:bg-[#0e56bd] transition-colors flex items-center cursor-pointer border-none w-full"
                        >
                            Cadastros <span className="text-xs ml-1">▼</span>
                        </button>
                        {dropdownOpen && (
                            <div className="mt-2 bg-white border border-[#d2d2d2] rounded-md shadow-lg min-w-[200px] z-10">
                                <Link to="/register" className="block px-4 py-2 text-base text-[#00008B] no-underline hover:bg-[#d2d2d2]" onClick={() => { setDropdownOpen(false); setMenuOpen(false) }}>
                                    Cadastrar Golpe
                                </Link>
                                <Link to="/rempresas" className="block px-4 py-2 text-base text-[#00008B] no-underline hover:bg-[#d2d2d2]" onClick={() => { setDropdownOpen(false); setMenuOpen(false) }}>
                                    Login Empresa
                                </Link>
                            </div>
                        )}
                    </li>
                </ul>
            )}
        </nav>
    )
}

export default Navbar