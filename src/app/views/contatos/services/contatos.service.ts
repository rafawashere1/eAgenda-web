import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormsContatoViewModel } from '../models/forms-contato-view-model';
import { ListarContatoViewModel } from '../models/listar-contato.view-model';
import { VisualizarContatoViewModel } from '../models/visualizar-contato.view-model';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class ContatosService {
  public favoritos: ListarContatoViewModel[];
  private endpoint: string;

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${environment.API_KEY}`
    })
  };

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
    this.endpoint = 'https://e-agenda-web-api.onrender.com/api/contatos';
    this.favoritos = this.localStorageService.carregarFavoritos();
  }

  
  public inserir(contato: FormsContatoViewModel): Observable<FormsContatoViewModel> {
    return this.http.post<any>(this.endpoint, contato, this.httpOptions)
      .pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public editar(id: string, contato: FormsContatoViewModel) {
    return this.http.put<any>(`${this.endpoint}/${id}`, contato, this.httpOptions)
      .pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public excluir(id: string): Observable<any> {
    return this.http.delete<any>(`${this.endpoint}/${id}`, this.httpOptions)
      .pipe(catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public selecionarTodos(): Observable<ListarContatoViewModel[]> {
    return this.http.get<any>(this.endpoint, this.httpOptions)
      .pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public selecionarPorId(id: string): Observable<FormsContatoViewModel> {
    return this.http.get<any>(`${this.endpoint}/${id}`, this.httpOptions)
      .pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public selecionarContatoCompletoPorId(id: string): Observable<VisualizarContatoViewModel> {
    return this.http.get<any>(`${this.endpoint}/visualizacao-completa/${id}`, this.httpOptions)
      .pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  private processarErroHttp(erro: HttpErrorResponse) {
    let mensagemErro = '';

    if (erro.status == 0)
      mensagemErro = 'Ocorreu um erro ao processar a requisição.';
    if (erro.status == 401)
      mensagemErro = 'O usuário não está autorizado. Efetue login e tente novamente.';
    else
      mensagemErro = erro.error?.erros[0];

    return throwError(() => new Error(mensagemErro))
  }
}
