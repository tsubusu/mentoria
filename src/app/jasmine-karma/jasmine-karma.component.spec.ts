import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JasmineKarmaComponent } from './jasmine-karma.component';

describe('JasmineKarmaComponent', () => {
  let component: JasmineKarmaComponent;
  let fixture: ComponentFixture<JasmineKarmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JasmineKarmaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JasmineKarmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
