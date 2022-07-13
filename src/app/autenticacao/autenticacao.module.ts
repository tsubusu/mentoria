import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutenticacaoInterceptor } from './autenticacao.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


/*
multi: true. O que é essa multi: true? Por padrão, o Angular
entender que você só vai ter uma classe de interceptor. 
Se você não passar nada e, por exemplo, criar outro interceptor 
para fazer outra coisa na cadeia de requisição, ele não vai registrá-lo,
porque você não falou que ele é do tipo multi, ou seja, que eu vou ter 
múltiplos interceptors
*/
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AutenticacaoInterceptor,
    multi: true
  }]
})
export class AutenticacaoModule { }
