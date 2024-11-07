import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScientificArticlePostCreationComponent } from './scientific-article-post-creation.component';

describe('ScientificArticlePostCreationComponent', () => {
  let component: ScientificArticlePostCreationComponent;
  let fixture: ComponentFixture<ScientificArticlePostCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScientificArticlePostCreationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScientificArticlePostCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
