import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostContentInputComponent } from './post-content-input.component';

describe('PostContentInputComponent', () => {
  let component: PostContentInputComponent;
  let fixture: ComponentFixture<PostContentInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostContentInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostContentInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
