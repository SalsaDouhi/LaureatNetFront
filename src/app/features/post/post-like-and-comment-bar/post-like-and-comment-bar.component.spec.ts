import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostLikeAndCommentBarComponent } from './post-like-and-comment-bar.component';

describe('PostLikeAndCommentBarComponent', () => {
  let component: PostLikeAndCommentBarComponent;
  let fixture: ComponentFixture<PostLikeAndCommentBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostLikeAndCommentBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostLikeAndCommentBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
