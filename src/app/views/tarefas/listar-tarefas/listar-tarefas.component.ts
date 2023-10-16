import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListarTarefaViewModel } from '../models/listar-tarefa.view-model';

@Component({
  selector: 'app-listar-tarefas',
  templateUrl: './listar-tarefas.component.html',
  styleUrls: ['./listar-tarefas.component.css'],
})
export class ListarTarefasComponent implements OnInit {
  tarefas: ListarTarefaViewModel[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.tarefas = this.route.snapshot.data['tarefas'];
  }
}