import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JasmineKarma2RoutingModule } from './jasmine-karma2-routing.module';
import { JasmineKarma2Component } from './jasmine-karma2.component';
import { PhotoFrameModule } from '@shared/componentes/photo-frame/photo-frame.module';
import { PhotoBoardModule } from '@shared/componentes/photo-board/photo-board.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    JasmineKarma2Component
  ],
  imports: [
    CommonModule,
    JasmineKarma2RoutingModule,
    PhotoFrameModule,
    PhotoBoardModule,
    FontAwesomeModule
  ]
})
export class JasmineKarma2Module { }
