import queryString from 'query-string'
import { useKeycloak } from '@react-keycloak/web';
import { Page, ErrorResponse } from "./Types"

export interface ProjetoPropriedade{
    nome: string,
    valor: string|boolean
}

export interface Projeto{
    nome: string
    justificativa: string
    temporario: boolean
    template: string
    repositorio: string
    pipeline: string
    registry: string
    deploy: string
    namespace: string
    propriedades: ProjetoPropriedade[]
}

export interface Template {
    id: number,
    nome: string
}

export interface ProjetoLista{
    nome: string,
    temporario: boolean,
    template: Template
}

export default class ProjetoService {
    auth = useKeycloak()

    async create(projeto: Projeto): Promise<void> {
        return fetch('http://doit-api-sandbox-arq-d.dev.paas.cnpbr.intranet/projetos',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.auth.keycloak.token}` 
            },
            body: JSON.stringify(projeto)
        })
        .then(response => {
            if(response.ok) return
            return response.json()
            .then((error: ErrorResponse) => {throw new Error(error.message)})
        })
        .catch(error => {throw error})
    }

    async listProjetos(filtro?: string, page?: number, size?: number): Promise<Page<ProjetoLista>>{
        const queryParams = queryString.stringify({
            dono: true,
            ...filtro && { filtro },
            ...page && { page },
            ...size && { size },
        })
        const response = await fetch(`http://doit-api-sandbox-arq-d.dev.paas.cnpbr.intranet/projetos?${queryParams}`,{
            headers:{'Authorization': `Bearer ${this.auth.keycloak.token}`}
        })
        if (response.ok) return response.json()
        const error = await response.json()
        throw new Error(error.message)
     }

}