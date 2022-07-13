import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { HttpHeaders } from '@angular/common/http';

/*
O interceptor é um serviço, está vendo aqui? @Injectable(), 
que implementa a interface HttpInterceptor. E ele tem o objetivo de 
interceptar toda requisição http que sai do nosso front-end e assim 
nós podemos manipular a requisição antes de ela ir para o servidor,
como no caso que vamos fazer aqui, que é anexar um token
*/

@Injectable()
export class AutenticacaoInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}


  /*
  O meu método intercept recebe a requisição aqui, 
  está vendo esse HttpRequest? Ele recebe a requisição. 
  Então eu vou fazer um clone dessa requisição, porque é 
  muito importante que esse request seja imutável, ou seja, eu 
  não consigo mutar o objeto, então se eu quiser alterar o objeto, 
  eu tenho que fazer um clone dele e colocar a informação a mais que 
  eu quero.

  next.handle(request); a requisição continua, mas com o request alterado com esse header.
  */
  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.tokenService.possuiToken()) {
      const token = this.tokenService.retornarToken();
      const headers = new HttpHeaders().append('x-access-token', token);

      request = request.clone({headers});//Adicionar ao options dele o { headers }. 
    }
    //E aqui return next.handle. Esse next.handle é para continuar requisição.
    return next.handle(request);
  }
}
