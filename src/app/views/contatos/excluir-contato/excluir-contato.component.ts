import { Component, OnInit } from '@angular/core';
import { FormsContatoViewModel } from '../models/forms-contato-view-model';
import { ContatosService } from '../services/contatos.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-excluir-contato',
  templateUrl: './excluir-contato.component.html',
  styleUrls: ['./excluir-contato.component.css']
})
export class ExcluirContatoComponent implements OnInit{
  contatoVM!: FormsContatoViewModel

  constructor(private contatoService: ContatosService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.contatoVM = this.route.snapshot.data['contato'];
  }

  gravar() {
    const id = this.route.snapshot.queryParamMap.get('id')!;

    if (!id) return;

    this.contatoService.excluir(id).subscribe((res) => {
      console.log(res)

      this.router.navigate(['/dashboard']);
    })
  }
}
