export class ListarContatoViewModel {
  id: string;
  nome: string;
  telefone: string;
  cargo: string;
  empresa: string;
  favoritos: boolean;

  constructor(id: string, nome: string, telefone: string, cargo: string, empresa: string, favoritos: boolean) {
    this.id = id;
    this.nome = nome;
    this.telefone = telefone;
    this.cargo = cargo;
    this.empresa = empresa;
    this.favoritos = favoritos;
  }
}
