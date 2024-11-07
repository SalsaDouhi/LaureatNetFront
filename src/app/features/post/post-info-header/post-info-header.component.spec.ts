import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostInfoHeaderComponent } from './post-info-header.component';

describe('PostInfoHeaderComponent', () => {
  let component: PostInfoHeaderComponent;
  let fixture: ComponentFixture<PostInfoHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostInfoHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostInfoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
