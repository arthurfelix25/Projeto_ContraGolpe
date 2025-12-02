import { useEffect, useState } from 'react'
import { GOLPES_ENDPOINTS, createAuthHeaders } from '../config/api'

function EmpresaDashboard() {
  const [denuncias, setDenuncias] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState('')
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)
  const [total, setTotal] = useState(0)

  const loadData = (usuario) => {
    if (!usuario || usuario === 'undefined') {
      setErro('Nome de usuário inválido. Faça login novamente.')
      setLoading(false)
      return
    }

    setLoading(true)
    const token = localStorage.getItem('authToken')
    
    if (!token) {
      setErro('Token de autenticação não encontrado. Faça login novamente.')
      setLoading(false)
      return
    }

    // Busca golpes pelo nome da empresa (busca parcial)
    const url = GOLPES_ENDPOINTS.BY_EMPRESA_BUSCAR(encodeURIComponent(usuario))
    console.log('>>> [Frontend] Fazendo requisição para:', url)
    console.log('>>> [Frontend] Token:', token)
    console.log('>>> [Frontend] Headers:', createAuthHeaders(token))
    
    fetch(url, {
      headers: createAuthHeaders(token)
    })
      .then(async (res) => {
        if (!res.ok) {
          const t = await res.text()
          throw new Error(t || 'Falha ao carregar denúncias')
        }
        return res.json()
      })
      .then((data) => {
        const golpes = Array.isArray(data) ? data : []
        setDenuncias(golpes)
        setTotal(golpes.length)
      })
      .catch((e) => {
        console.error('Erro ao carregar golpes:', e)
        setErro(e.message)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    console.log('>>> [Frontend] EmpresaDashboard montado')
    const usuario = localStorage.getItem('empresaUsuario')
    const token = localStorage.getItem('authToken')
    
    console.log('>>> [Frontend] Usuario:', usuario)
    console.log('>>> [Frontend] Token:', token ? 'Presente' : 'Ausente')
    
    if (!usuario || !token) {
      console.log('>>> [Frontend] Sessão inválida')
      setErro('Sessão expirada ou não encontrada. Por favor, faça login novamente.')
      setLoading(false)
      return
    }
    
    console.log('>>> [Frontend] Chamando loadData')
    loadData(usuario)
  }, [])

  // Paginação local
  const startIndex = page * size
  const endIndex = startIndex + size
  const denunciasPaginadas = denuncias.slice(startIndex, endIndex)
  const totalPages = Math.ceil(total / size)

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      <h1 className="text-xl md:text-2xl font-bold text-[#0b3d91] mb-4">Denúncias da sua empresa</h1>
      {loading && <p className="text-sm">Carregando...</p>}
      {erro && <p className="text-red-600 text-sm md:text-base">{erro}</p>}
      {!loading && !erro && (
        denuncias.length === 0 ? (
          <p className="text-sm">Nenhuma denúncia encontrada para sua empresa.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-[#e0e0e0] bg-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-3 border-b">
              <div className="text-xs md:text-sm">Total: <span className="font-semibold">{total}</span> denúncia(s)</div>
              <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm">
                <button className="px-2 py-1 rounded bg-[#f5f5f5] hover:bg-[#e6e6e6] disabled:opacity-50" disabled={page === 0} onClick={() => setPage((p) => Math.max(0, p - 1))}>Anterior</button>
                <span>Página {page + 1} de {totalPages || 1}</span>
                <button className="px-2 py-1 rounded bg-[#f5f5f5] hover:bg-[#e6e6e6] disabled:opacity-50" disabled={page >= totalPages - 1} onClick={() => setPage((p) => p + 1)}>Próxima</button>
                <select className="border rounded px-2 py-1" value={size} onChange={(e) => { setPage(0); setSize(parseInt(e.target.value, 10)) }}>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
              </div>
            </div>
            <table className="min-w-full text-left text-xs md:text-sm">
              <thead>
                <tr className="bg-[#f2f2f2]">
                  <th className="p-2 font-semibold">Nome</th>
                  <th className="p-2 font-semibold hidden sm:table-cell">Cidade</th>
                  <th className="p-2 font-semibold hidden md:table-cell">Contato</th>
                  <th className="p-2 font-semibold hidden lg:table-cell">Empresa</th>
                  <th className="p-2 font-semibold">Descrição</th>
                </tr>
              </thead>
              <tbody>
                {denunciasPaginadas.map((d) => (
                  <tr key={d.id} className="border-b last:border-none hover:bg-[#f9f9f9]">
                    <td className="p-2 align-top">{d.nome}</td>
                    <td className="p-2 align-top hidden sm:table-cell">{d.cidade}</td>
                    <td className="p-2 align-top hidden md:table-cell">{d.emailOuTelefone || 'N/A'}</td>
                    <td className="p-2 align-top hidden lg:table-cell">{d.empresa}</td>
                    <td className="p-2 align-top w-[40%] md:w-auto whitespace-pre-wrap break-words">{d.descricao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  )
}

export default EmpresaDashboard
