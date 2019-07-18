import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpcalcComponent } from './gpcalc.component';

describe('GpcalcComponent', () => {
  let component: GpcalcComponent;
  let fixture: ComponentFixture<GpcalcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpcalcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpcalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
