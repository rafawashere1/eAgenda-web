import { Injectable } from "@angular/core";
import { TokenViewModel } from "../models/token.view-model";

@Injectable()
export class localStorageService {
  private chaveLocalStorage: string = 'eAgenda-dados'

  public salvarDadosLocaisUsuario(usuario: TokenViewModel) {
    const JSON_STRING = JSON.stringify(usuario)

    localStorage.setItem(this.chaveLocalStorage, JSON_STRING)
  }

  public obterDadosLocaisSalvos(): TokenViewModel | undefined {
    const jsonString = localStorage.getItem(this.chaveLocalStorage);

    if (!jsonString) return undefined;

    return JSON.parse(jsonString) as TokenViewModel;
  }

  public limparDadosLocais(): void {
    localStorage.setItem(this.chaveLocalStorage, '');
  }
}