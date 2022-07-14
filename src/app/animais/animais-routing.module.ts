import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaAnimaisComponent } from './lista-animais/lista-animais.component';
import { DetalheAnimalComponent } from './detalhe-animal/detalhe-animal.component';
import { ListaAnimaisResolver } from './lista-animais/lista-animais.resolver';
import { NovoAnimalComponent } from './novo-animal/novo-animal.component';

const routes: Routes = [
  {
    path: '', component: ListaAnimaisComponent,
    /*
     é preciso atribuir esse resolve a uma variável, 
     no caso, eu vou chamar essa variável de animais:, 
     que vai ser a ListaAnimaisResolver

    Ele vai fazer a busca no back-end, trazer o observable, 
    retirar a informação do observable e colocar aqui na variável animais. 
    E com isso nós temos o acesso a isso antes do componente ser renderizado
    */
    resolve: {
      animais: ListaAnimaisResolver
    }
  },
  {
    path: 'novo', component: NovoAnimalComponent
  },
  {
    path: ':animalID', component: DetalheAnimalComponent //recebe o parametro :animalId 
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimaisRoutingModule { }
