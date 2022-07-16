import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YesNoRadioButtonGroupComponent } from './yes-no-radio-button-group.component';

describe('YesNoRadioButtonGroupComponent', () => {
  let component: YesNoRadioButtonGroupComponent;
  let fixture: ComponentFixture<YesNoRadioButtonGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YesNoRadioButtonGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YesNoRadioButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
