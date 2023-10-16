import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InserirTarefaComponent } from './inserir-tarefa/inserir-tarefa.component';
import { ListarTarefasComponent } from './listar-tarefas/listar-tarefas.component';
import { TarefasService } from './services/tarefas.service';

const listarTarefasResolver = () => {
  return inject(TarefasService).selecionarTodos();
};

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },

  {
    path: 'listar',
    component: ListarTarefasComponent,
    resolve: { tarefas: listarTarefasResolver },
  },
  {
    path: 'inserir',
    component: InserirTarefaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TarefasRoutingModule {}