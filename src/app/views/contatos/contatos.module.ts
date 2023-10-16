import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InserirContatosComponent } from './inserir-contatos/inserir-contatos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContatosService } from './services/contatos.service';
import { ListarContatosComponent } from './listar-contatos/listar-contatos.component';
import { EditarContatoComponent } from './editar-contato/editar-contato.component';
import { ExcluirContatoComponent } from './excluir-contato/excluir-contato.component';
import { CardContatoComponent } from './card-contato/card-contato.component';
import 'src/app/extensions/form.group.extension';
import { ContatosRoutingModule } from './contatos-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    InserirContatosComponent,
    ListarContatosComponent,
    EditarContatoComponent,
    ExcluirContatoComponent,
    CardContatoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ContatosRoutingModule,
    CoreModule,
    NgbNavModule,
    NgbTooltipModule,
  ],
  providers: [
    ContatosService
  ]
})
export class ContatosModule { }
