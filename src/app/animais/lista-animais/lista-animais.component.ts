import { Component, OnInit } from '@angular/core';
import { Animais } from '../shared/model/animal.model';
import { UsuarioService } from '../../autenticacao/usuario/usuario.service';
import { AnimaisService } from '../shared/service/animais.service';
import { mergeMap, take, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-lista-animais',
  templateUrl: './lista-animais.component.html',
  styleUrls: ['./lista-animais.component.scss']
})
export class ListaAnimaisComponent implements OnInit {
  //public animais$!: Observable<Animais>; //não existe instancia, sera instanciado no ngOnInit

  //atualização de como receber a lista de animais, agr recebe pelo resolver que fica na rota de animais
  animais!: Animais;

  constructor( private usuarioService: UsuarioService,
      private animaisService: AnimaisService,
      private activatedRoute: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    //atualização de como receber a lista de animais, agr recebe pelo resolver que fica na rota de animais
    // this.animais$ = this.usuarioService.retornarUsuario() 
    // .pipe(
    //   mergeMap(usuario => {
    //     const userName = usuario.name ?? '';
    //     return this.animaisService.obterAnimaisDoUsuario(userName);
    //   })
    // );

    // this.usuarioService.retornarUsuario() // esse caso seria seria sem utilizar observables
    // .pipe(
    //   take(1),
    //   map(x => x.name ?? ''), //Caso seja undefined ou null vai ser ''
    //   mergeMap(x => 
    //     this.animaisService.obterAnimaisDoUsuario(x)
    //     .pipe(
    //       tap(animais => this.animais = animais)
    //     )
    //   )
    // ).subscribe();

    this.activatedRoute.params
      .subscribe(param => {
        this.animais = this.activatedRoute.snapshot.data['animais'];
      })
  }

}
