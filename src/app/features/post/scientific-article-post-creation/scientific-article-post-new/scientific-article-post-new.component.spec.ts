import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScientificArticlePostNewComponent } from './scientific-article-post-new.component';

describe('ScientificArticlePostNewComponent', () => {
  let component: ScientificArticlePostNewComponent;
  let fixture: ComponentFixture<ScientificArticlePostNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScientificArticlePostNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScientificArticlePostNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
