import { NgModule, inject } from '@angular/core';
import {ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes,} from '@angular/router';
import { InserirCompromissoComponent } from './inserir-compromisso/inserir-compromisso.component';
import { ListarCompromissosComponent } from './listar-compromissos/listar-compromissos.component';
import { FormsCompromissoViewModel } from './models/forms-compromisso.view-model';
import { CompromissosService } from './services/compromissos.service';
import { EditarCompromissoComponent } from './editar-compromisso/editar-compromisso.component';
import { VisualizarCompromissoViewModel } from './models/visualizar-compromisso.view-model';
import { ExcluirCompromissoComponent } from './excluir-compromisso/excluir-compromisso.component';
import { ListarCompromissoViewModel } from './models/listar-compromisso.view-model';

const listarCompromissosResolver: ResolveFn<ListarCompromissoViewModel[]> = () => {
  return inject(CompromissosService).selecionarTodos();
};

const formsCompromissoResolver: ResolveFn<FormsCompromissoViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(CompromissosService).selecionarPorId(route.queryParamMap.get('id')!);
};

const visualizarCompromissoResolver: ResolveFn<
  VisualizarCompromissoViewModel
> = (route: ActivatedRouteSnapshot) => {
  return inject(CompromissosService).selecionarCompromissoCompletoPorId(
    route.queryParamMap.get('id')!
  );
};

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  {
    path: 'listar',
    component: ListarCompromissosComponent,
    resolve: { compromisso: listarCompromissosResolver },
  },
  {
    path: 'inserir',
    component: InserirCompromissoComponent,
  },
  {
    path: 'editar',
    component: EditarCompromissoComponent,
    resolve: { compromisso: formsCompromissoResolver },
  },
  {
    path: 'excluir',
    component: ExcluirCompromissoComponent,
    resolve: { compromisso: visualizarCompromissoResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompromissosRoutingModule {}