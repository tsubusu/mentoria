import { Component, OnInit } from '@angular/core';
import { NovoUsuarioService } from '../shared/services/novo-usuario.service';
import { tap, take, catchError } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NovoUsuario } from '../shared/model/novo-usuario';
import { minusculoValidator } from '../shared/validator/minusculo.validator';
import { confirmarSenhaIguaisValidator } from '../shared/validator/confirmar-senha-iguais.validator';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.scss']
})
export class NovoUsuarioComponent implements OnInit {
  public novoUsuarioForm!: FormGroup; //! pode ser nulo ou não;

  constructor(private novoUsuarioService: NovoUsuarioService,
      private formBuilder: FormBuilder,
      private router: Router,
    ) { }

  ngOnInit(): void {
    this.novoUsuarioForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', [Validators.required, Validators.minLength(4)]],
      userName: ['', [minusculoValidator], [this.novoUsuarioService.usuarioJaExiste()], 'blur'],
      password: ['', [Validators.required]],
      confirmPassword: [''] 
    },
    {// Validação para o Formulario
      validators: [confirmarSenhaIguaisValidator],
      updateOn: 'blur' // para chamadas assincronas o uso do updateOn é importante para a performace e numero de requisições 'change' | 'blur' | 'submit';
    });
  }

  public cadastrar(): void {
    const novoUsuario = this.novoUsuarioForm.getRawValue() as NovoUsuario; //getRawValue -> ele retorna as variaveis do form
    this.novoUsuarioService.cadastrarNovoUsuario(novoUsuario)
    .pipe(
      take(1),
      tap(() => this.router.navigate([''])),
      catchError(x => of(x))
    ).subscribe();
  }

  public geterror() {
    this.novoUsuarioForm;
  }
}
