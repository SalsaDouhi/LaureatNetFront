import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshipOfferBannerComponent } from './internship-offer-banner.component';

describe('InternshipOfferBannerComponent', () => {
  let component: InternshipOfferBannerComponent;
  let fixture: ComponentFixture<InternshipOfferBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternshipOfferBannerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InternshipOfferBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
