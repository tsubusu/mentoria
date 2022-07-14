import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, switchMap, take } from 'rxjs';
import { AnimaisService } from '../shared/service/animais.service';
import { UsuarioService } from '../../autenticacao/usuario/usuario.service';
import { Animais } from '../shared/model/animal.model';
/*
ng g resolver lista-animais/listaAnimais

O objetivo desse serviço é realizar alguma operação, carregar alguma informação 
antes da rota ser resolvida. Então, na lista, nós carregávamos os animais a partir 
do componente já criado. Aqui, nesse caso, não, vamos começar a fazer a busca na API 
antes, enquanto a página é renderizada.
Quando o usuário clicar na rota ou for na rota, ele já vai começar a busca. 
Nós vamos ganhar um pouco de tempo de fazer isso não quando o componente estiver pronto, 
mas sim adiantar esse trabalho.

*/
@Injectable({
  providedIn: 'root'
})
export class ListaAnimaisResolver implements Resolve<Animais> {

  constructor(private animaisService: AnimaisService,
      private usuarioService: UsuarioService
    ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Animais> {
    return this.usuarioService.retornarUsuario()
      .pipe(
        switchMap(usuario => {
          const userName = usuario.name ?? '';
          return this.animaisService.obterAnimaisDoUsuario(userName);
        }),
        take(1)
      );
  }
}
