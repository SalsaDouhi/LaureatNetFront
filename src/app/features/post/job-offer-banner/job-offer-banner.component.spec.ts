import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOfferBannerComponent } from './job-offer-banner.component';

describe('JobOfferBannerComponent', () => {
  let component: JobOfferBannerComponent;
  let fixture: ComponentFixture<JobOfferBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobOfferBannerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobOfferBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
