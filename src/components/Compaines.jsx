import { useEffect, useState } from "react"
import { GOLPES_ENDPOINTS } from "../config/api"

function RankingEmpresas() {
  const [ranking, setRanking] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    // Busca o ranking de empresas com mais golpes (endpoint público)
    fetch(GOLPES_ENDPOINTS.RANKING_PUBLICO)
      .then(async (res) => {
        if (!res.ok) {
          const txt = await res.text()
          throw new Error(txt || 'Falha ao carregar ranking')
        }
        return res.json()
      })
      .then((data) => {
        setRanking(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch((err) => {
        console.error("Erro ao buscar ranking:", err)
        setErro(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-[#0b3d91] border-dashed rounded-full animate-spin"></div>
        <p className="mt-4 text-[#2e2e2e]">Carregando ranking...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f5f5] to-white">
      <header className="px-4 pt-8 pb-6">
        <h1 className="text-center text-[#0b3d91] text-2xl md:text-3xl font-bold">
          Empresas com Mais Golpes Reportados
        </h1>
        <p className="text-center text-[#666] mt-2 text-sm md:text-base">
          Ranking baseado em denúncias de usuários
        </p>
      </header>

      <div className="px-4 pb-12">
        {erro && (
          <div className="max-w-xl md:max-w-2xl mx-auto mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {erro}
          </div>
        )}

        {!erro && ranking.length === 0 && (
          <div className="max-w-xl md:max-w-2xl mx-auto text-center p-8 bg-white shadow-md rounded-lg">
            <p className="text-[#666]">Nenhuma empresa com golpes reportados ainda.</p>
          </div>
        )}

        {!erro && ranking.length > 0 && (
          <div className="max-w-xl md:max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-5 md:p-6">
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-center text-[#0b3d91]">
              🏆 Ranking de Empresas
            </h2>
            <ul className="space-y-2">
              {ranking.map((item, index) => (
                <li
                  key={item.empresa || index}
                  className={`flex justify-between items-center py-3 px-4 rounded-lg border-l-4 ${
                    index === 0 ? 'border-yellow-500 bg-yellow-50' :
                    index === 1 ? 'border-gray-400 bg-gray-50' :
                    index === 2 ? 'border-orange-600 bg-orange-50' :
                    'border-[#e0e0e0] bg-white'
                  } hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className={`font-bold text-lg ${
                      index === 0 ? 'text-yellow-600' :
                      index === 1 ? 'text-gray-600' :
                      index === 2 ? 'text-orange-600' :
                      'text-[#666]'
                    }`}>
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                    </span>
                    <span className="font-medium text-[#2e2e2e] truncate text-sm md:text-base">
                      {item.empresa}
                    </span>
                  </div>
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap ml-2">
                    {item.count} {item.count === 1 ? 'golpe' : 'golpes'}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-[#e0e0e0] text-center text-xs text-[#999]">
              Total de empresas: {ranking.length}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RankingEmpresas