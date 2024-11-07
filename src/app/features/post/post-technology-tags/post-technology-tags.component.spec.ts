import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTechnologyTagsComponent } from './post-technology-tags.component';

describe('PostTechnologyTagsComponent', () => {
  let component: PostTechnologyTagsComponent;
  let fixture: ComponentFixture<PostTechnologyTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostTechnologyTagsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostTechnologyTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
