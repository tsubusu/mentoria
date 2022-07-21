import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JasmineKarmaRoutingModule } from './jasmine-karma-routing.module';
import { JasmineKarmaComponent } from './jasmine-karma.component';
import { LikeWidgetModule } from '@shared/componentes/like-widget/like-widget.module';


@NgModule({
  declarations: [JasmineKarmaComponent],
  imports: [
    CommonModule,
    JasmineKarmaRoutingModule,
    LikeWidgetModule
  ]
})
export class JasmineKarmaModule { }
