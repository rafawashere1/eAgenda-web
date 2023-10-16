import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { ListarCategoriasComponent } from './listar-categorias/listar-categorias.component';
import { CardCategoriaComponent } from './card-categoria/card-categoria.component';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';
import { InserirCategoriaComponent } from './inserir-categoria/inserir-categoria.component';
import { ExcluirCategoriaComponent } from './excluir-categoria/excluir-categoria.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoriasService } from './services/categorias.service';
import { CoreModule } from 'src/app/core/core.module';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    declarations: [
        ListarCategoriasComponent,
        CardCategoriaComponent,
        EditarCategoriaComponent,
        InserirCategoriaComponent,
        ExcluirCategoriaComponent
    ],
    providers: [
        CategoriasService
    ],
    imports: [
        CommonModule,
        CategoriasRoutingModule,
        ReactiveFormsModule,
        NgbTooltipModule,
        CoreModule
    ]
})
export class CategoriasModule { }
