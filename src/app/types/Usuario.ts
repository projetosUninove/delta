import { Contato } from "./Contato"
import { Endereco } from "./Endereco"

export class Usuario {
    public id!: number
    public email!: string
    public cnpj!: string
    public razaoSocial!: string
    public nomeFantasia!: string
    public inscricaoEstadual!: string
    public inscricaoCcm!: string
    public codigoContabil!: string
    public enderecos!: Endereco[]
    public contatos!: Contato[]
    public senha!: string
}