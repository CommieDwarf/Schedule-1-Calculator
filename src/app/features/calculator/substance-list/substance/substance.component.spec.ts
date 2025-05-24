import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Substance } from './substance.component';

describe('HalfProductComponent', () => {
  let component: Substance;
  let fixture: ComponentFixture<Substance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Substance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Substance);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
