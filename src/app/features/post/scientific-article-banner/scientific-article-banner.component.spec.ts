import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScientificArticleBannerComponent } from './scientific-article-banner.component';

describe('ScientificArticleBannerComponent', () => {
  let component: ScientificArticleBannerComponent;
  let fixture: ComponentFixture<ScientificArticleBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScientificArticleBannerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScientificArticleBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
