import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAttachementsComponent } from './post-attachements.component';

describe('PostAttachementsComponent', () => {
  let component: PostAttachementsComponent;
  let fixture: ComponentFixture<PostAttachementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostAttachementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostAttachementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
