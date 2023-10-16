import { Injectable } from '@angular/core';
import { ListarContatoViewModel } from '../models/listar-contato.view-model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly localStorage: Storage;
  private readonly chave: string = 'eAgenda_favoritos@1.0.0';

  private favoritos: ListarContatoViewModel[];

  constructor() { 
    this.localStorage = window.localStorage;

    this.favoritos = this.carregarFavoritos();
  }

  public favoritar(contato: ListarContatoViewModel): void {
    if (this.favoritos.find((c): boolean => c.id == contato.id)) return;

    this.favoritos.push(contato);
    this.salvar();
  }

  public desfavoritar(id: string): void {
    this.favoritos = this.favoritos.filter((c): boolean => c.id != id);
    this.salvar();
  }

  public carregarFavoritos(): ListarContatoViewModel[] {
    const dados = this.localStorage.getItem(this.chave);

    if (!dados) return [];

    const objetos = JSON.parse(dados);

    const contatos = new Array<ListarContatoViewModel>();

    for (const objeto of objetos) {
      contatos.push(new ListarContatoViewModel(objeto.id, objeto.nome, objeto.telefone, objeto.cargo, objeto.empresa, objeto.favorito));
    }

    return contatos
  }

  public selecionarPorId(id: string): ListarContatoViewModel | undefined {
    return this.favoritos.find((c): boolean => c.id == id)
  }

  salvar(): void {
    const jsonString = JSON.stringify(this.favoritos);

    localStorage.setItem(this.chave, jsonString);
  }
}
