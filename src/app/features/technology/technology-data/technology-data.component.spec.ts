import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologyDataComponent } from './technology-data.component';

describe('TechnologyDataComponent', () => {
  let component: TechnologyDataComponent;
  let fixture: ComponentFixture<TechnologyDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnologyDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TechnologyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
