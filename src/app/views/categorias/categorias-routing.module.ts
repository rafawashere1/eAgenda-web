import { NgModule, inject } from '@angular/core';
import {ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { InserirCategoriaComponent } from './inserir-categoria/inserir-categoria.component';
import { ListarCategoriasComponent } from './listar-categorias/listar-categorias.component';
import { ListarCategoriaViewModel } from './models/listar-categoria.view-model';
import { CategoriasService } from './services/categorias.service';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';
import { FormsCategoriaViewModel } from './models/forms-categoria.view-model';
import { ExcluirCategoriaComponent } from './excluir-categoria/excluir-categoria.component';
import { VisualizarCategoriaViewModel } from './models/visualizar-categoria.view-model';

const listarCategoriasResolver: ResolveFn<ListarCategoriaViewModel[]> = () => {
  return inject(CategoriasService).selecionarTodos();
};

const formsCategoriaResolver: ResolveFn<FormsCategoriaViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(CategoriasService).selecionarPorId(route.queryParamMap.get('id')!);
};

const visualizarCategoriaResolver: ResolveFn<VisualizarCategoriaViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(CategoriasService).selecionarCategoriaCompletaPorId(
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
    component: ListarCategoriasComponent,
    resolve: { categorias: listarCategoriasResolver },
  },
  {
    path: 'inserir',
    component: InserirCategoriaComponent,
  },
  {
    path: 'editar',
    component: EditarCategoriaComponent,
    resolve: { categoria: formsCategoriaResolver },
  },

  {
    path: 'excluir',
    component: ExcluirCategoriaComponent,
    resolve: { categoria: visualizarCategoriaResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriasRoutingModule {}