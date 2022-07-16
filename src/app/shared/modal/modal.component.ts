import { Component, OnInit } from '@angular/core';
import { ModalConfig } from './services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  public modalConfig!: ModalConfig;
  
  constructor() { }

  ngOnInit(): void {
  }

}
