import { Injectable } from '@angular/core';
import { FormsTarefaViewModel } from '../models/forms-tarefa.view-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListarTarefaViewModel } from '../models/listar-tarefa.view-model';

@Injectable()
export class TarefasService {
  private endpoint: string =
    'https://e-agenda-web-api.onrender.com/api/tarefas/';

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${environment.API_KEY}`
    })
  };

  public inserir(
    tarefa: FormsTarefaViewModel
  ): Observable<FormsTarefaViewModel> {
    return this.http
      .post<any>(this.endpoint, tarefa, this.httpOptions)
      .pipe(map((res) => res.dados));
  }

  public selecionarTodos(): Observable<ListarTarefaViewModel[]> {
    return this.http
      .get<any>(this.endpoint, this.httpOptions)
      .pipe(map((res) => res.dados));
  }
}