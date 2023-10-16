import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DespesasRoutingModule } from './despesas-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoriasModule } from '../categorias/categorias.module';
import { InserirDespesaComponent } from './inserir-despesa/inserir-despesa.component';
import { EditarDespesaComponent } from './editar-despesa/editar-despesa.component';
import { ExcluirDespesaComponent } from './excluir-despesa/excluir-despesa.component';
import { ListarDespesasComponent } from './listar-despesas/listar-despesas.component';
import { DespesasService } from './services/despesas.service';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    InserirDespesaComponent,
    EditarDespesaComponent,
    ExcluirDespesaComponent,
    ListarDespesasComponent
  ],
  imports: [
    CommonModule,
    DespesasRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbTooltipModule,
    CategoriasModule
  ],
  providers: [
    DespesasService
  ]
})
export class DespesasModule { }
