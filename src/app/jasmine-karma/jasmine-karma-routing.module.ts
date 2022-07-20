import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JasmineKarmaComponent } from './jasmine-karma.component';

const routes: Routes = [
  { path: '', component: JasmineKarmaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JasmineKarmaRoutingModule { }
