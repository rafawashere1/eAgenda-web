import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VisualizarTarefaViewModel } from '../models/visualizar-tarefa.view-model';
import { TarefasService } from '../services/tarefas.service';

@Component({
  selector: 'app-excluir-tarefa',
  templateUrl: './excluir-tarefa.component.html',
  styleUrls: ['./excluir-tarefa.component.css'],
})
export class ExcluirTarefaComponent implements OnInit {
  tarefaVM?: VisualizarTarefaViewModel;

  constructor(
    private tarefasService: TarefasService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tarefaVM = this.route.snapshot.data['tarefa'];
  }

  gravar() {
    this.tarefasService.excluir(this.tarefaVM!.id).subscribe((res) => {
      this.toastrService.success(
        'A tarefa foi excluída com sucesso!',
        'Sucesso'
      );

      this.router.navigate(['/tarefas', 'listar']);
    });
  }
}
