import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YesNoButtonGroupComponent } from './yes-no-button-group.component';
import { KeyboardManagerModule } from '@shared/directive/keyboard-manager/keyboard-manager.module';



@NgModule({
  declarations: [
    YesNoButtonGroupComponent
  ],
  imports: [
    CommonModule,
    KeyboardManagerModule
  ],
  exports: [
    YesNoButtonGroupComponent
  ]
})
export class YesNoButtonGroupModule { }
