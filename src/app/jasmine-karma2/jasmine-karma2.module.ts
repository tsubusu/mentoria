import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JasmineKarma2RoutingModule } from './jasmine-karma2-routing.module';
import { JasmineKarma2Component } from './jasmine-karma2.component';
import { PhotoFrameModule } from '@shared/componentes/photo-frame/photo-frame.module';


@NgModule({
  declarations: [
    JasmineKarma2Component
  ],
  imports: [
    CommonModule,
    JasmineKarma2RoutingModule,
    PhotoFrameModule
  ]
})
export class JasmineKarma2Module { }
