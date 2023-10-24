import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormsDespesaViewModel } from '../models/forms-despesa.view-model';
import { ListarDespesaViewModel } from '../models/listar-despesa.view-model';
import { VisualizarDespesaViewModel } from '../models/visualizar-despesa.view-model';

@Injectable()
export class DespesasService {
  private endpoint: string =
    'https://e-agenda-web-api.onrender.com/api/despesas';
  
  constructor(private http: HttpClient) {}

  public inserir(despesa: FormsDespesaViewModel): Observable<FormsDespesaViewModel> {
    return this.http.post<any>(this.endpoint, despesa)
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public editar(id: string, despesa: FormsDespesaViewModel): Observable<FormsDespesaViewModel> {
    return this.http.put<any>(`${this.endpoint}/${id}`, despesa)
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public excluir(id: string): Observable<any> {
    return this.http.delete<any>(`${this.endpoint}/${id}`);
  }

  public selecionarTodos(): Observable<ListarDespesaViewModel[]> {
    return this.http.get<any>(this.endpoint)
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public selecionarPorId(id: string): Observable<FormsDespesaViewModel> {
    return this.http.get<any>(`${this.endpoint}/${id}`)
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public selecionarDespesaCompletaPorId(id: string): Observable<VisualizarDespesaViewModel> {
    return this.http.get<any>(`${this.endpoint}/visualizacao-completa/${id}`)
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