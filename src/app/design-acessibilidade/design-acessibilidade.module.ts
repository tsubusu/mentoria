import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignAcessibilidadeComponent } from './design-acessibilidade.component';
import { DesignAcessibilidadeRoutingModule } from './design-acessibilidade-routing.module';
import { YesNoButtonGroupModule } from '@shared/componentes/yes-no-button-group/yes-no-button-group.module';
import { SharedModule } from '@shared/module/shared.module';
import { FormsModule } from '@angular/forms';
import { DisableControlModule } from '@shared/directive/disable-control/disable-control.module';
import { YesNoRadioButtonGroupModule } from '@shared/componentes/yes-no-radio-button-group/yes-no-radio-button-group.module';


@NgModule({
  declarations: [DesignAcessibilidadeComponent],
  imports: [
    CommonModule,
    DesignAcessibilidadeRoutingModule,
    YesNoButtonGroupModule,
    SharedModule,
    FormsModule,
    DisableControlModule,
    YesNoRadioButtonGroupModule
  ]
})
export class DesignAcessibilidadeModule { }
