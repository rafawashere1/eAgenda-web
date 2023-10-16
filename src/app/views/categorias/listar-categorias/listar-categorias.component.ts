import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListarCategoriaViewModel } from '../models/listar-categoria.view-model';

@Component({
  selector: 'app-listar-categorias',
  templateUrl: './listar-categorias.component.html',
  styleUrls: ['./listar-categorias.component.css'],
})
export class ListarCategoriasComponent implements OnInit {
  categorias: ListarCategoriaViewModel[];
  isLoading: boolean;

  constructor(private route: ActivatedRoute) {
    this.categorias = [];
    this.isLoading = true;
  }

  ngOnInit(): void {
    this.categorias = this.route.snapshot.data['categorias'];
    this.isLoading = false;
  }
}