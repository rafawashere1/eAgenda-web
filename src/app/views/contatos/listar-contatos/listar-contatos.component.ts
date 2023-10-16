import { Component, OnInit } from '@angular/core';
import { ListarContatoViewModel } from '../models/listar-contato.view-model';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-listar-contatos',
  templateUrl: './listar-contatos.component.html',
  styleUrls: ['./listar-contatos.component.css']
})
export class ListarContatosComponent implements OnInit {
  contatos: ListarContatoViewModel[];
  isLoading: boolean;
  activeId: number = 1;

  constructor(private route: ActivatedRoute, private toastrService: ToastrService, private localStorage: LocalStorageService) {
    this.contatos = new Array<ListarContatoViewModel>();
    this.isLoading = true;
   }

  ngOnInit(): void {
    this.carregarTodosContatos();
  }

  atualizarLista() {
    if (this.activeId == 1) {
      this.carregarTodosContatos();
    }
    else if (this.activeId == 2) {
      this.carregarFavoritos();
    }
  }

  carregarFavoritos() {
    this.contatos = this.localStorage.carregarFavoritos();
  }

  carregarTodosContatos(): void {
    this.route.data.pipe(map(dados => dados['contatos'])).subscribe({
      next: (contatos) => this.processarSucesso(contatos),
      error: (erro) => this.processarFalha(erro)
    })
  }

  processarSucesso(contatos: ListarContatoViewModel[]) {
    this.contatos = contatos;
    this.isLoading = false;
  }

  processarFalha(erro: Error) {
    this.toastrService.error(erro.message, 'Error');
  }
}
