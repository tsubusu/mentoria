import { Component } from '@angular/core';
import { UsuarioService } from '../../autenticacao/usuario/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.scss']
})
export class CabecalhoComponent {
  user$ = this.usuarioService.retornarUsuario();

  constructor(private usuarioService: UsuarioService,
    private router: Router,
  ) { }

  public logout(): void {
    this.usuarioService.logout();
    this.router.navigate(['']);
  }
}
