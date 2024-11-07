import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostOptionsButtonComponent } from './post-options-button.component';

describe('PostOptionsButtonComponent', () => {
  let component: PostOptionsButtonComponent;
  let fixture: ComponentFixture<PostOptionsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostOptionsButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostOptionsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
