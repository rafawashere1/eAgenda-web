import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsContatoViewModel } from '../models/forms-contato-view-model';
import { ContatosService } from '../services/contatos.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-editar-contato',
  templateUrl: './editar-contato.component.html',
  styleUrls: ['./editar-contato.component.css']
})
export class EditarContatoComponent {
  form!: FormGroup;
  contatoVM!: FormsContatoViewModel;

  constructor(private formBuilder: FormBuilder, private contatoService: ContatosService, private router: Router, private route: ActivatedRoute, private toastrService: ToastrService) { 
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      telefone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      cargo: new FormControl('', [Validators.required]),
      empresa: new FormControl('', [Validators.required]),
    });

    this.contatoVM = this.route.snapshot.data['contato']

    this.form.patchValue(this.contatoVM)
  }

  get nome() {
    return this.form.get('nome');
  }

  get telefone() {
    return this.form.get('telefone');
  }

  get email() {
    return this.form.get('email');
  }

  get cargo() {
    return this.form.get('cargo');
  }

  get empresa() {
    return this.form.get('empresa');
  }

  campoEstaInvalido(campo: string): boolean {
    return this.form.get(campo)!.touched && this.form.get(campo)!.invalid
  }

  gravar() {
    if (this.form.invalid) {
      for (let erro of this.form.validate()) {
        this.toastrService.warning(erro);
    } 

      return;
    }

    this.contatoVM = this.form.value;

    const id = this.route.snapshot.queryParamMap.get('id');

    if (!id) return;

    this.contatoService.editar(id, this.contatoVM).subscribe({
      next: (contato: FormsContatoViewModel) => this.processarSucesso(contato),
      error: (erro: HttpErrorResponse) => this.processarFalha(erro)
    });
  }

  processarSucesso(contato: FormsContatoViewModel) {
    this.toastrService.success(
      `O contato "${contato.nome}" foi cadastrado com sucesso!`,
      'Sucesso'
    );

    this.router.navigate(['/contatos/listar']);
  }

  processarFalha(erro: Error) {
    this.toastrService.error(erro.message, 'Error');
  }
}
