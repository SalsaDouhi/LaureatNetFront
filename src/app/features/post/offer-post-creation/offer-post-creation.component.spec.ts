import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferPostCreationComponent } from './offer-post-creation.component';

describe('OfferPostCreationComponent', () => {
  let component: OfferPostCreationComponent;
  let fixture: ComponentFixture<OfferPostCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferPostCreationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfferPostCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
