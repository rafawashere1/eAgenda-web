import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TarefasRoutingModule } from './tarefas-routing.module';
import { InserirTarefaComponent } from './inserir-tarefa/inserir-tarefa.component';
import { EditarTarefaComponent } from './editar-tarefa/editar-tarefa.component';
import { ExcluirTarefaComponent } from './excluir-tarefa/excluir-tarefa.component';
import { ListarTarefasComponent } from './listar-tarefas/listar-tarefas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TarefasService } from './services/tarefas.service';


@NgModule({
  declarations: [
    InserirTarefaComponent,
    EditarTarefaComponent,
    ExcluirTarefaComponent,
    ListarTarefasComponent
  ],
  imports: [
    CommonModule,
    TarefasRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbTooltipModule
  ],
  providers: [
    TarefasService
  ]
})
export class TarefasModule { }
