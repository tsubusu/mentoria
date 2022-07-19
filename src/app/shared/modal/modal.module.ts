import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { ModalService } from './services/modal.service';
import { FocusTrapModule } from '@shared/directive/focus-trap/focus-trap-module';
import { FocusBackModule } from '@shared/directive/focus-back/focus-back.module';



@NgModule({
  declarations: [
    ModalComponent
  ],
  imports: [
    CommonModule,
    FocusTrapModule,
    FocusBackModule
  ],
  exports: [
    ModalComponent
  ],
  providers:[
    ModalService
  ]
})
export class ModalModule { }
