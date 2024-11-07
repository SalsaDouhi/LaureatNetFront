import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionModalFormComponent } from './section-modal-form.component';

describe('SectionModalFormComponent', () => {
  let component: SectionModalFormComponent;
  let fixture: ComponentFixture<SectionModalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionModalFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectionModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
