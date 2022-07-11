import { Component, OnInit } from '@angular/core';
import { NovoUsuarioService } from '../shared/services/novo-usuario.service';
import { tap, take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NovoUsuario } from '../shared/model/novo-usuario';
import { minusculoValidator } from '../shared/validator/minusculo.validator';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.scss']
})
export class NovoUsuarioComponent implements OnInit {
  public novoUsuarioForm!: FormGroup; //! pode ser nulo ou não;

  constructor(private novoUsuarioService: NovoUsuarioService,
      private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.novoUsuarioForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', [Validators.required, Validators.minLength(4)]],
      userName: ['', [minusculoValidator,
        this.novoUsuarioService.usuarioJaExiste()]],
      password: ['', [Validators.required]]
    });
  }

  public cadastrar(): void {
    const novoUsuario = this.novoUsuarioForm.getRawValue() as NovoUsuario; //getRawValue -> ele retorna as variaveis do form
    this.novoUsuarioService.cadastrarNovoUsuario(novoUsuario)
    .pipe(
      take(1),
      tap(x => x)
    ).subscribe();
  }

  public geterror() {
    this.novoUsuarioForm;
  }
}
