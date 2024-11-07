import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentLineComponent } from './comment-line.component';

describe('CommentLineComponent', () => {
  let component: CommentLineComponent;
  let fixture: ComponentFixture<CommentLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentLineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommentLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
