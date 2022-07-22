import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JasmineKarma2Component } from './jasmine-karma2.component';

const routes: Routes = [
  { path: '', component: JasmineKarma2Component }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JasmineKarma2RoutingModule { }
