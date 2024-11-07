import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScientificArticlePostExistingComponent } from './scientific-article-post-existing.component';

describe('ScientificArticlePostExistingComponent', () => {
  let component: ScientificArticlePostExistingComponent;
  let fixture: ComponentFixture<ScientificArticlePostExistingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScientificArticlePostExistingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScientificArticlePostExistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
