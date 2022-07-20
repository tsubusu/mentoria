import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JasmineKarmaRoutingModule } from './jasmine-karma-routing.module';
import { JasmineKarmaComponent } from './jasmine-karma.component';


@NgModule({
  declarations: [JasmineKarmaComponent],
  imports: [
    CommonModule,
    JasmineKarmaRoutingModule
  ]
})
export class JasmineKarmaModule { }
