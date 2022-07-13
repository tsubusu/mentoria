import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeFotoAnimaisComponent } from './grade-foto-animais.component';

describe('GradeFotoAnimaisComponent', () => {
  let component: GradeFotoAnimaisComponent;
  let fixture: ComponentFixture<GradeFotoAnimaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradeFotoAnimaisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradeFotoAnimaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
