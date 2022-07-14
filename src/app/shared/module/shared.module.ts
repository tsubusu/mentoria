import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensagemModule } from '../componentes/mensagem/mensagem.module';
import { ReactiveFormsModule } from '@angular/forms';

/*
 Então vou criar aqui o módulo shared, ele é um módulo 
 sem rota e ele criou aqui o arquivo. Esse módulo vai 
 ter a única função de agrupar módulos em comum.
*/

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MensagemModule,
    ReactiveFormsModule
  ],
  exports: [
    MensagemModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
