import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LikeWidgetComponent } from './like-widget.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ActionModule } from '@shared/directive/action/action.module';

@NgModule({
  declarations: [
    LikeWidgetComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ActionModule
  ],
  exports: [
    LikeWidgetComponent
  ]
})
export class LikeWidgetModule { }
