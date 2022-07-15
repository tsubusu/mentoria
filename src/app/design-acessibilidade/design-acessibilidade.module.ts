import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignAcessibilidadeComponent } from './design-acessibilidade.component';
import { DesignAcessibilidadeRoutingModule } from './design-acessibilidade-routing.module';
import { YesNoButtonGroupModule } from '@shared/componentes/yes-no-button-group/yes-no-button-group.module';
import { SharedModule } from '@shared/module/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [DesignAcessibilidadeComponent],
  imports: [
    CommonModule,
    DesignAcessibilidadeRoutingModule,
    YesNoButtonGroupModule,
    SharedModule,
    FormsModule
  ]
})
export class DesignAcessibilidadeModule { }
