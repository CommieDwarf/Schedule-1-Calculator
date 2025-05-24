import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubstanceList } from './substance-list.component';

describe('HalfProductsComponent', () => {
  let component: SubstanceList;
  let fixture: ComponentFixture<SubstanceList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubstanceList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubstanceList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
