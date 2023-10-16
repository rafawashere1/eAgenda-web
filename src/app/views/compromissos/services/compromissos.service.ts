import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormsCompromissoViewModel } from "../models/forms-compromisso.view-model";
import { environment } from "src/environments/environment";
import { Observable, catchError, map, throwError } from "rxjs";
import { ListarCompromissoViewModel } from "../models/listar-compromisso.view-model";
import { VisualizarCompromissoViewModel } from "../models/visualizar-compromisso.view-model";

@Injectable()
export class CompromissosService {
  private endpoint: string;

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${environment.API_KEY}`
    })
  };

  constructor(private http: HttpClient) {
    this.endpoint = 'https://e-agenda-web-api.onrender.com/api/compromissos';
  }

  public inserir(compromisso: FormsCompromissoViewModel): Observable<FormsCompromissoViewModel> {
    return this.http.post<any>(this.endpoint, compromisso, this.httpOptions)
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public editar(id: string, compromisso: FormsCompromissoViewModel): Observable<FormsCompromissoViewModel> {
    return this.http.put<any>(`${this.endpoint}/${id}`, compromisso, this.httpOptions)
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public excluir(id: string): Observable<any> {
    return this.http.delete(`${this.endpoint}/${id}`, this.httpOptions);
  }

  public selecionarTodos(): Observable<ListarCompromissoViewModel[]> {
    return this.http.get<any>(this.endpoint, this.httpOptions)
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public selecionarPorId(id: string): Observable<FormsCompromissoViewModel> {
    return this.http.get<any>(`${this.endpoint}/${id}`, this.httpOptions)
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public selecionarCompromissoCompletoPorId(id: string): Observable<VisualizarCompromissoViewModel> {
    return this.http.get<any>(`${this.endpoint}/visualizacao-completa/${id}`, this.httpOptions)
      .pipe(map((res) => res.dados),
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