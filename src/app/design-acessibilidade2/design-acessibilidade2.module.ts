import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignAcessibilidade2RoutingModule } from './design-acessibilidade2-routing.module';
import { DesignAcessibilidade2Component } from './design-acessibilidade2.component';
import { ModalModule } from '@shared/modal/modal.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/module/shared.module';

@NgModule({
  declarations: [
    DesignAcessibilidade2Component
  ],
  imports: [
    CommonModule,
    DesignAcessibilidade2RoutingModule,
    ModalModule,
    FormsModule,
    SharedModule,
  ]
})
export class DesignAcessibilidade2Module { }
