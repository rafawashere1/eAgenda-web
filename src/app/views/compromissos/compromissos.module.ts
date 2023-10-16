import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { CompromissosService } from './services/compromissos.service';
import { InserirCompromissoComponent } from './inserir-compromisso/inserir-compromisso.component';
import { ListarCompromissosComponent } from './listar-compromissos/listar-compromissos.component';
import { EditarCompromissoComponent } from './editar-compromisso/editar-compromisso.component';
import { CompromissosRoutingModule } from './compromissos-routing.module';
import { ContatosModule } from '../contatos/contatos.module';
import { ExcluirCompromissoComponent } from './excluir-compromisso/excluir-compromisso.component';
import { CardCompromissoComponent } from './card-compromisso/card-compromisso.component';

@NgModule({
  declarations: [
    InserirCompromissoComponent,
    ListarCompromissosComponent,
    EditarCompromissoComponent,
    ExcluirCompromissoComponent,
    CardCompromissoComponent
  ],
  imports: [
    CommonModule,
    CompromissosRoutingModule,
    NgbModule,
    NgbTooltipModule,
    ReactiveFormsModule,
    ContatosModule
  ],
  providers: [
    CompromissosService
  ]
})
export class CompromissosModule { }
