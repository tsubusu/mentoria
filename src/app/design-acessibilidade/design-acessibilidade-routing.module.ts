import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesignAcessibilidadeComponent } from './design-acessibilidade.component';

const routes: Routes = [
  {
    path: '', component: DesignAcessibilidadeComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignAcessibilidadeRoutingModule { }
