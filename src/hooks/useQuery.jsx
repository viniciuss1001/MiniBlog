//hook para a pesquisa por tags
import {useLocation} from 'react-router-dom'
import { useMemo } from 'react'

export function useQuery() {
    const {search}= useLocation()
    

    return useMemo(()=> new URLSearchParams(search), [search]) //declaramos o parâmetro entre [] para a função ser executada quando o padrão de busca for alterado
}