import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixListComponent } from './mix-list.component';

describe('MixListComponent', () => {
  let component: MixListComponent;
  let fixture: ComponentFixture<MixListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MixListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MixListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
