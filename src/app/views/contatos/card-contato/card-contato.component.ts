import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListarContatoViewModel } from '../models/listar-contato.view-model';
import { ContatoLocalStorageService } from '../services/local-storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card-contato',
  templateUrl: './card-contato.component.html',
  styleUrls: ['./card-contato.component.css']
})
export class CardContatoComponent {
  @Input({ required: true }) contato!: ListarContatoViewModel;

  // @Output() favoritar = new EventEmitter<any>();

  constructor(private localStorageService: ContatoLocalStorageService, private toastrService: ToastrService) {

  }

  adicionarAosFavoritos() {
    if (this.contato) {
      const filmeNoLocalStorage = this.localStorageService.selecionarPorId(this.contato.id);
  
      if (filmeNoLocalStorage) {
        this.localStorageService.desfavoritar(this.contato.id);
        this.toastrService.success('Contato removido dos favoritos.')
      } else {
        this.localStorageService.favoritar(this.contato);
        this.toastrService.success('Contato adicionado aos favoritos.')
      }
    }
  }

  contatoEstaNosFavoritos(): boolean {
    return this.localStorageService.selecionarPorId(this.contato.id) !== undefined;
  }
}
