import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesignAcessibilidade2Component } from './design-acessibilidade2.component';

const routes: Routes = [
  {path: '', component: DesignAcessibilidade2Component}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignAcessibilidade2RoutingModule { }
