import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JasmineKarma2Component } from './jasmine-karma2.component';

describe('JasmineKarma2Component', () => {
  let component: JasmineKarma2Component;
  let fixture: ComponentFixture<JasmineKarma2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JasmineKarma2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JasmineKarma2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
