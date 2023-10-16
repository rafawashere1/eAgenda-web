import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContatosService } from '../services/contatos.service';
import { Router } from '@angular/router';
import { FormsContatoViewModel } from '../models/forms-contato-view-model';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-inserir-contatos',
  templateUrl: './inserir-contatos.component.html',
  styleUrls: ['./inserir-contatos.component.css']
})
export class InserirContatosComponent implements OnInit {
  form!: FormGroup;
  contatoVM!: FormsContatoViewModel;

  constructor(private formBuilder: FormBuilder, private contatoService: ContatosService, private router: Router, private toastrService: ToastrService) { 

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      telefone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      cargo: new FormControl('', [Validators.required]),
      empresa: new FormControl('', [Validators.required]),
    })
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

    this.contatoService.inserir(this.contatoVM).subscribe({
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
