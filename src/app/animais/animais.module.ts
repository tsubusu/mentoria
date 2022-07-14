import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimaisRoutingModule } from './animais-routing.module';
import { ListaAnimaisComponent } from './lista-animais/lista-animais.component';
import { AnimalComponent } from './animal/animal.component';
import { CartaoModule } from '../componentes/cartao/cartao.module';
import { GradeFotoAnimaisComponent } from './grade-foto-animais/grade-foto-animais.component';
import { DetalheAnimalComponent } from './detalhe-animal/detalhe-animal.component';
import { ComentariosComponent } from './detalhe-animal/comentarios/comentarios.component';
import { MensagemModule } from '../shared/componentes/mensagem/mensagem.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/module/shared.module';
import { NovoAnimalComponent } from './novo-animal/novo-animal.component';



@NgModule({
  declarations: [
  
    ListaAnimaisComponent,
       AnimalComponent,
       GradeFotoAnimaisComponent,
       DetalheAnimalComponent,
       ComentariosComponent,
       NovoAnimalComponent
  ],
  imports: [
    CommonModule,
    AnimaisRoutingModule,
    CartaoModule,
    SharedModule
  ]
})
export class AnimaisModule { }
