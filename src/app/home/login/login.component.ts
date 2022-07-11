import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '@shared/model/usuario.model';
import { catchError, of, take, tap } from 'rxjs';
import { AutenticacaoService } from '../../autenticacao/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  usuario = {} as Usuario;
  constructor(private authService: AutenticacaoService,
    private router: Router,
    ) { }

  ngOnInit(): void {
  }

  login() {
    console.log(this.usuario);
    this.authService.autenticar(this.usuario)
    .pipe(
      take(1),
      tap(x => this.router.navigate(['animais'])),
      catchError(x => {
        console.log(x);
        return of(x);
      })
    ).subscribe();
  }

}
